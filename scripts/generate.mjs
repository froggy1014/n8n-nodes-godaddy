#!/usr/bin/env node
/**
 * Generates n8n node descriptions and the operation registry from the GoDaddy
 * Domains v3 OpenAPI 3.1 spec, filtered by scripts/allowlist.json.
 *
 * Outputs (all overwritten, never hand-edit):
 *   nodes/GoDaddy/descriptions/<Resource>.ts
 *   nodes/GoDaddy/descriptions/index.ts
 *   nodes/GoDaddy/registry.ts
 *   nodes/GoDaddy/mocks.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const spec = JSON.parse(readFileSync(join(here, 'spec', 'domains-v3.json'), 'utf8'));
const allowlist = JSON.parse(readFileSync(join(here, 'allowlist.json'), 'utf8'));
const apiVersion = JSON.parse(readFileSync(join(here, 'spec', 'godaddy-version.json'), 'utf8')).version;

const HEADER = `// GENERATED FILE — do not edit by hand.
// Source: GoDaddy Domains v3 OpenAPI spec v${apiVersion} (scripts/spec/domains-v3.json)
// Regenerate with: npm run generate
/* eslint-disable */
`;

// ---------- spec helpers ----------

/** Resolve any in-document JSON pointer ('#/components/schemas/X', '#/x-ext/abc', ...). */
function resolvePointer(ref) {
	if (!ref.startsWith('#/')) throw new Error(`Only in-document $refs supported: ${ref}`);
	let cur = spec;
	for (const part of ref.slice(2).split('/')) {
		cur = cur?.[part.replace(/~1/g, '/').replace(/~0/g, '~')];
	}
	if (cur === undefined) throw new Error(`Unresolvable $ref: ${ref}`);
	return cur;
}

/**
 * Normalize an OAS 3.1 schema for our purposes:
 * follow $ref chains (components.schemas entries are themselves refs into
 * x-ext), merge allOf members, and collapse type arrays (['string','null']).
 */
function normalizeSchema(schema, depth = 0) {
	if (!schema || typeof schema !== 'object' || depth > 12) return {};
	let seen = 0;
	while (schema.$ref) {
		schema = resolvePointer(schema.$ref);
		if (++seen > 12) throw new Error('$ref chain too deep');
	}
	if (schema.allOf) {
		const merged = { ...schema };
		delete merged.allOf;
		for (const part of schema.allOf) {
			const n = normalizeSchema(part, depth + 1);
			if (n.properties) merged.properties = { ...(merged.properties ?? {}), ...n.properties };
			if (n.required) merged.required = [...(merged.required ?? []), ...n.required];
			for (const k of ['type', 'enum', 'format', 'items', 'default', 'description', 'title']) {
				if (merged[k] === undefined && n[k] !== undefined) merged[k] = n[k];
			}
		}
		schema = merged;
	}
	if (Array.isArray(schema.type)) {
		schema = { ...schema, type: schema.type.find((t) => t !== 'null') ?? 'string' };
	}
	return schema;
}

/** Index all operations by operationId. */
const opsById = {};
for (const [path, methods] of Object.entries(spec.paths)) {
	if (typeof methods !== 'object' || methods === null) continue;
	const pathParams = methods.parameters ?? [];
	for (const [method, op] of Object.entries(methods)) {
		if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;
		opsById[op.operationId] = { method: method.toUpperCase(), path, op, pathParams };
	}
}

function humanize(name) {
	return name
		.replace(/[_-]/g, ' ')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.split(' ')
		.filter(Boolean)
		.map((w) => w[0].toUpperCase() + w.slice(1))
		.join(' ')
		.replace(/\bId\b/g, 'ID')
		.replace(/\bUrl\b/g, 'URL')
		.replace(/\bApi\b/g, 'API')
		.replace(/\bDns\b/g, 'DNS')
		.replace(/\bTld\b/g, 'TLD')
		.replace(/\bTlds\b/g, 'TLDs')
		.replace(/\bTtl\b/g, 'TTL');
}

/** n8n parameter name: camelCase, no dashes/dots ('domain-name' → 'domainName'). */
function camel(name) {
	return name.replace(/[-_.]+(\w)/g, (_, c) => c.toUpperCase());
}

function cleanDescription(text) {
	if (!text) return '';
	return text.replace(/\s+/g, ' ').trim();
}

/** normalized schema → n8n property fragments */
function toN8nType(schema) {
	if (schema.enum) {
		return {
			type: 'options',
			options: schema.enum.map((v) => ({ name: humanize(String(v)), value: v })),
			default: schema.default ?? schema.enum[0],
		};
	}
	switch (schema.type) {
		case 'integer':
		case 'number':
			return { type: 'number', default: schema.default ?? 0 };
		case 'boolean':
			return { type: 'boolean', default: schema.default ?? false };
		case 'array':
		case 'object':
			// Exposed as raw JSON in the UI; parsed by the executor.
			return { type: 'json', default: schema.type === 'array' ? '[]' : '{}', json: true };
		case 'string':
			return { type: 'string', default: schema.default ?? '' };
		default:
			// no type but has properties → object-ish → raw JSON
			if (schema.properties) return { type: 'json', default: '{}', json: true };
			return { type: 'string', default: schema.default ?? '' };
	}
}

/**
 * Flatten one operation's parameters into a uniform list:
 * { api, in: path|query|body|fullBody, required, schema, description }
 * Header parameters (X-Request-Id, Idempotency-Key) are skipped.
 */
function collectParams(entry) {
	const merged = [...entry.pathParams, ...(entry.op.parameters ?? [])].map((p) =>
		p.$ref ? resolvePointer(p.$ref) : p,
	);
	const out = [];
	for (const p of merged) {
		if (p.in !== 'path' && p.in !== 'query') continue;
		out.push({
			api: p.name,
			in: p.in,
			required: !!p.required || p.in === 'path',
			schema: normalizeSchema(p.schema ?? {}),
			description: cleanDescription(p.description),
		});
	}
	let rb = entry.op.requestBody;
	if (rb) {
		if (rb.$ref) rb = resolvePointer(rb.$ref);
		const schema = normalizeSchema(rb.content?.['application/json']?.schema ?? {});
		if (schema.type === 'object' || (schema.properties && !schema.type)) {
			const requiredProps = new Set(schema.required ?? []);
			for (const [name, prop] of Object.entries(schema.properties ?? {})) {
				const n = normalizeSchema(prop);
				if (n.readOnly) continue;
				out.push({
					api: name,
					in: 'body',
					required: requiredProps.has(name),
					schema: n,
					description: cleanDescription(n.description),
				});
			}
		} else {
			// Non-object body (e.g. NameServers is a top-level array) → single raw-JSON field
			out.push({
				api: '',
				in: 'fullBody',
				required: !!rb.required,
				schema,
				description:
					cleanDescription(schema.description) ||
					`Request body (${schema.type ?? 'JSON'}) sent as-is`,
			});
		}
	}
	return out;
}

// ---------- n8n property builders ----------

/** Emit a JS object literal (tab-indented). */
function emit(obj, indent) {
	const pad = '\t'.repeat(indent);
	const padIn = '\t'.repeat(indent + 1);
	if (Array.isArray(obj)) {
		if (obj.length === 0) return '[]';
		return `[\n${obj.map((v) => `${padIn}${emit(v, indent + 1)}`).join(',\n')},\n${pad}]`;
	}
	if (obj !== null && typeof obj === 'object') {
		const entries = Object.entries(obj).filter(([, v]) => v !== undefined);
		if (entries.length === 0) return '{}';
		return `{\n${entries
			.map(([k, v]) => `${padIn}${/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : JSON.stringify(k)}: ${emit(v, indent + 1)}`)
			.join(',\n')},\n${pad}}`;
	}
	return JSON.stringify(obj);
}

const registry = {};
const resourceFiles = [];

mkdirSync(join(root, 'nodes', 'GoDaddy', 'descriptions'), { recursive: true });

for (const [resource, resDef] of Object.entries(allowlist)) {
	const opValues = Object.keys(resDef.operations).sort((a, b) =>
		resDef.operations[a].name.localeCompare(resDef.operations[b].name),
	);

	const operationsProperty = {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: [resource] } },
		options: opValues.map((v) => ({
			name: resDef.operations[v].name,
			value: v,
			action: resDef.operations[v].action,
			description: cleanDescription(opsById[resDef.operations[v].operationId].op.summary),
		})),
		default: opValues[0],
	};

	const fields = [];

	for (const opValue of opValues) {
		const { operationId } = resDef.operations[opValue];
		const entry = opsById[operationId];
		if (!entry) throw new Error(`operationId not in spec: ${operationId}`);
		const params = collectParams(entry);

		const show = { resource: [resource], operation: [opValue] };
		const usedNames = new Set();
		const regParams = [];
		const queryOpts = [];
		const bodyOpts = [];

		for (const p of params) {
			let paramName = p.in === 'fullBody' ? 'requestBody' : camel(p.api);
			if (p.required && usedNames.has(paramName)) paramName = `${p.in}_${paramName}`;
			if (p.required) usedNames.add(paramName);

			let t;
			let description = p.description || undefined;
			if (p.in === 'query' && p.schema.type === 'array') {
				// explode:false form style → the API expects a comma-separated string
				t = { type: 'string', default: '' };
				description = `${p.description ? `${p.description} ` : ''}(comma-separated list)`.trim();
			} else {
				t = toN8nType(p.schema);
			}

			const field = {
				displayName: p.in === 'fullBody' ? 'Request Body' : humanize(p.api),
				name: paramName,
				type: t.type,
				options: t.options,
				default: t.default,
				description,
			};

			if (p.required) {
				field.required = true;
				field.displayOptions = { show };
				fields.push(field);
			} else if (p.in === 'query') {
				queryOpts.push(field);
			} else {
				bodyOpts.push(field);
			}

			regParams.push({
				api: p.api,
				param: paramName,
				in: p.in,
				required: p.required,
				json: !!t.json,
			});
		}

		const byName = (a, b) => a.displayName.localeCompare(b.displayName);
		if (queryOpts.length > 0) {
			fields.push({
				displayName: 'Query Parameters',
				name: 'queryParameters',
				type: 'collection',
				placeholder: 'Add Parameter',
				default: {},
				displayOptions: { show },
				options: queryOpts.sort(byName),
			});
		}
		if (bodyOpts.length > 0) {
			fields.push({
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show },
				options: bodyOpts.sort(byName),
			});
		}

		registry[`${resource}.${opValue}`] = {
			method: entry.method,
			path: entry.path,
			params: regParams,
		};
	}

	const pascal = resource[0].toUpperCase() + resource.slice(1);
	const file = `${pascal}.ts`;
	resourceFiles.push({ resource, pascal, file });

	writeFileSync(
		join(root, 'nodes', 'GoDaddy', 'descriptions', file),
		`${HEADER}import type { INodeProperties } from 'n8n-workflow';

export const ${resource}Operations: INodeProperties = ${emit(operationsProperty, 0)};

export const ${resource}Fields: INodeProperties[] = ${emit(fields, 0)};
`,
	);
}

writeFileSync(
	join(root, 'nodes', 'GoDaddy', 'descriptions', 'index.ts'),
	`${HEADER}${resourceFiles.map(({ pascal }) => `export * from './${pascal}';`).join('\n')}\n`,
);

writeFileSync(
	join(root, 'nodes', 'GoDaddy', 'registry.ts'),
	`${HEADER}export interface RegistryParam {
	/** Parameter name in the GoDaddy API ('' for fullBody) */
	api: string;
	/** Parameter name in the n8n UI */
	param: string;
	in: 'path' | 'query' | 'body' | 'fullBody';
	required: boolean;
	/** True when the UI exposes this as a raw-JSON field that must be parsed */
	json: boolean;
}

export interface RegistryEntry {
	method: string;
	path: string;
	params: RegistryParam[];
}

export const GODADDY_API_VERSION = ${JSON.stringify(apiVersion)};

export const REGISTRY: Record<string, RegistryEntry> = ${emit(registry, 0)};
`,
);

// ---------- mock data ----------
// Deterministic sample responses built from each operation's success-response
// schema. Values come from spec examples where present, else from types and
// field-name heuristics. Must stay deterministic: CI checks generated files.

const MOCK_DEPTH_LIMIT = 4;

function mockString(name, schema) {
	if (schema.format === 'date-time' || schema.format === 'date') return '2026-01-01T00:00:00Z';
	if (schema.format === 'uuid') return '00000000-0000-4000-8000-000000000000';
	if (schema.format === 'email' || name.includes('email')) return 'user@example.com';
	if (name.endsWith('url') || name === 'href') return 'https://api.godaddy.com/v3/domains/example';
	if (name.includes('domain') || name === 'zone' || name === 'fqdn') return 'example.com';
	if (name.includes('token')) return 'token-00000000';
	if (name.includes('currency')) return 'USD';
	if (name.includes('version')) return apiVersion;
	if (name.includes('name')) return 'example';
	return 'string';
}

function mockValue(name, rawSchema, stack) {
	const ref = rawSchema?.$ref;
	if (ref && (stack.includes(ref) || stack.length >= MOCK_DEPTH_LIMIT)) return null;
	const schema = normalizeSchema(rawSchema);
	const nextStack = ref ? [...stack, ref] : stack;
	if (schema.example !== undefined) return schema.example;
	if (schema.enum) return schema.enum[0];
	switch (schema.type) {
		case 'integer':
		case 'number':
			return name === 'id' || name.endsWith('Id') ? 1 : 0;
		case 'boolean':
			return false;
		case 'array':
			if (nextStack.length >= MOCK_DEPTH_LIMIT) return [];
			return [mockValue(name, schema.items ?? {}, nextStack)];
		case 'object': {
			const out = {};
			for (const [n, prop] of Object.entries(schema.properties ?? {})) {
				out[n] = mockValue(n, prop, nextStack);
			}
			return out;
		}
		default:
			if (schema.properties) return mockValue(name, { ...schema, type: 'object' }, nextStack);
			return mockString(name, schema);
	}
}

/** Success-response schema of an operation (200/201/202), or null. */
function successSchema(op) {
	for (const code of ['200', '201', '202']) {
		let resp = op.responses?.[code];
		if (!resp) continue;
		if (resp.$ref) resp = resolvePointer(resp.$ref);
		const schema = resp?.content?.['application/json']?.schema;
		if (schema) return schema;
	}
	return null;
}

const mocks = {};
for (const [resource, resDef] of Object.entries(allowlist)) {
	for (const [opValue, { operationId }] of Object.entries(resDef.operations)) {
		const schema = successSchema(opsById[operationId].op);
		mocks[`${resource}.${opValue}`] = schema ? mockValue('', schema, []) : { success: true };
	}
}

writeFileSync(
	join(root, 'nodes', 'GoDaddy', 'mocks.ts'),
	`${HEADER}export const MOCKS: Record<string, unknown> = ${JSON.stringify(mocks, null, '\t')};\n`,
);

const opCount = Object.keys(registry).length;
console.log(
	`Generated ${resourceFiles.length} resource files, ${opCount} operations, ${opCount} mocks (GoDaddy Domains v${apiVersion}).`,
);
