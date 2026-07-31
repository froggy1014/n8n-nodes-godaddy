import { IDataObject, IExecuteFunctions, IHttpRequestMethods, NodeOperationError } from 'n8n-workflow';
import { REGISTRY, RegistryEntry } from './registry';

export interface GoDaddyRequestSpec {
	method: IHttpRequestMethods;
	path: string;
	qs: IDataObject;
	/** undefined = no body. Objects accumulate per-field; fullBody replaces wholesale (may be an array). */
	body: unknown;
}

/** JSON 필드 값 파싱: 문자열이면 parse, 이미 객체면 그대로. */
function parseJsonValue(ctx: IExecuteFunctions, i: number, name: string, raw: unknown): unknown {
	if (typeof raw !== 'string') return raw;
	const trimmed = raw.trim();
	if (trimmed === '') return undefined;
	try {
		return JSON.parse(trimmed);
	} catch (error) {
		throw new NodeOperationError(ctx.getNode(), `Parameter "${name}" is not valid JSON`, {
			itemIndex: i,
		});
	}
}

/** path 세그먼트 인코딩. */
function encodePathValue(value: string): string {
	return encodeURIComponent(value);
}

/**
 * resource+operation 파라미터로부터 GoDaddy API 요청 스펙을 조립한다.
 * 오퍼레이션별 매핑은 전부 생성된 REGISTRY 가 담당하므로 여기는 완전히 generic.
 */
export function buildRequest(ctx: IExecuteFunctions, i: number): GoDaddyRequestSpec {
	const resource = ctx.getNodeParameter('resource', i) as string;
	const operation = ctx.getNodeParameter('operation', i) as string;
	const key = `${resource}.${operation}`;

	const entry: RegistryEntry | undefined = REGISTRY[key];
	if (!entry) {
		throw new NodeOperationError(ctx.getNode(), `Unknown operation: ${key}`, { itemIndex: i });
	}

	const queryColl = ctx.getNodeParameter('queryParameters', i, {}) as IDataObject;
	const bodyColl = ctx.getNodeParameter('additionalFields', i, {}) as IDataObject;

	let path = entry.path;
	const qs: IDataObject = {};
	let body: unknown;

	for (const p of entry.params) {
		let raw: unknown;
		if (p.required) {
			raw = ctx.getNodeParameter(p.param, i);
		} else if (p.in === 'query') {
			raw = queryColl[p.param];
		} else {
			raw = bodyColl[p.param];
		}
		if (raw === undefined || raw === null || raw === '') continue;

		const value = p.json ? parseJsonValue(ctx, i, p.param, raw) : raw;
		if (value === undefined) continue;

		if (p.in === 'path') {
			path = path.replace(`{${p.api}}`, encodePathValue(String(value)));
		} else if (p.in === 'query') {
			qs[p.api] = value as IDataObject[string];
		} else if (p.in === 'fullBody') {
			body = value;
		} else {
			if (body === undefined) body = {};
			(body as IDataObject)[p.api] = value as IDataObject[string];
		}
	}

	return { method: entry.method as IHttpRequestMethods, path, qs, body };
}
