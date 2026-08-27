#!/usr/bin/env node
/**
 * Summarises what changed at the operation level between the committed spec and
 * the freshly fetched one, for the body of the automated spec-update PR.
 *
 * The generator only emits operations listed in scripts/allowlist.json, so an
 * operation GoDaddy adds upstream produces no diff in nodes/ and would otherwise
 * pass unnoticed. Removals are already fatal (generate.mjs throws on a missing
 * operationId); they are reported here so the failure reads as intentional.
 *
 * Reads the new spec from disk and the old one from git, so it must run after
 * fetch-spec.mjs and before the change is committed.
 *
 * Usage:
 *   node scripts/spec-report.mjs
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const specPath = join(here, 'spec', 'domains-v3.json');

const newSpec = JSON.parse(readFileSync(specPath, 'utf8'));
const allowlist = JSON.parse(readFileSync(join(here, 'allowlist.json'), 'utf8'));

let oldSpec;
try {
	oldSpec = JSON.parse(
		execFileSync('git', ['show', 'HEAD:scripts/spec/domains-v3.json'], { encoding: 'utf8' }),
	);
} catch {
	console.log('_No committed spec to compare against; skipping the operation report._');
	process.exit(0);
}

/** Flatten a spec into operationId -> { route, summary, deprecated }. */
function operations(spec) {
	const out = new Map();
	for (const [route, item] of Object.entries(spec.paths ?? {})) {
		for (const [method, op] of Object.entries(item)) {
			if (!op?.operationId) continue;
			out.set(op.operationId, {
				route: `${method.toUpperCase()} ${route}`,
				summary: op.summary ?? '',
				deprecated: Boolean(op.deprecated),
			});
		}
	}
	return out;
}

const before = operations(oldSpec);
const after = operations(newSpec);

/** operationIds the node actually generates, mapped to their resource.operation key. */
const covered = new Map();
for (const [resource, def] of Object.entries(allowlist)) {
	for (const [operation, op] of Object.entries(def.operations)) {
		covered.set(op.operationId, `${resource}.${operation}`);
	}
}

const added = [...after.keys()].filter((id) => !before.has(id));
const removed = [...before.keys()].filter((id) => !after.has(id));
const newlyDeprecated = [...after].filter(
	([id, op]) => op.deprecated && !before.get(id)?.deprecated,
);
const missing = [...covered.keys()].filter((id) => !after.has(id));

const lines = [];

if (added.length) {
	lines.push('### New operations upstream', '');
	lines.push('| operationId | Endpoint | In the node | Summary |');
	lines.push('| --- | --- | --- | --- |');
	for (const id of added) {
		const op = after.get(id);
		const where = covered.has(id) ? `\`${covered.get(id)}\`` : '**no — add to allowlist.json**';
		lines.push(`| \`${id}\` | \`${op.route}\` | ${where} | ${op.summary.replace(/\|/g, '\\|')} |`);
	}
	lines.push('');
	if (added.some((id) => !covered.has(id))) {
		lines.push(
			'Operations marked **no** are absent from `scripts/allowlist.json`, so this PR does not',
			'expose them. Add them there in a follow-up if they belong in the node.',
			'',
		);
	}
}

if (removed.length) {
	lines.push('### Operations removed upstream', '');
	for (const id of removed) {
		const where = covered.has(id) ? ` — **was exposed as \`${covered.get(id)}\`**` : '';
		lines.push(`- \`${id}\` (\`${before.get(id).route}\`)${where}`);
	}
	lines.push('');
}

if (missing.length) {
	lines.push(
		'> [!WARNING]',
		`> Allowlisted but no longer in the spec: ${missing.map((id) => `\`${id}\``).join(', ')}.`,
		'> `npm run generate` fails until `scripts/allowlist.json` is updated.',
		'',
	);
}

if (newlyDeprecated.length) {
	lines.push('### Newly deprecated', '');
	for (const [id, op] of newlyDeprecated) {
		const where = covered.has(id) ? ` — exposed as \`${covered.get(id)}\`` : '';
		lines.push(`- \`${id}\` (\`${op.route}\`)${where}`);
	}
	lines.push('');
}

if (!lines.length) {
	lines.push(
		'No operations were added, removed, or deprecated — the diff is confined to schemas,',
		'parameters, and descriptions of the operations the node already exposes.',
		'',
	);
}

const uncovered = [...after.keys()].filter((id) => !covered.has(id)).length;
lines.push(
	`_${covered.size} of ${after.size} spec operations are exposed by the node; ${uncovered} are intentionally out of scope._`,
);

console.log(lines.join('\n'));
