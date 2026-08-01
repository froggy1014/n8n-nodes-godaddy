import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
} from 'n8n-workflow';
import {
	discoveryFields,
	discoveryOperations,
	dnsRecordFields,
	dnsRecordOperations,
	domainFields,
	domainOperations,
	operationFields,
	operationOperations,
	registrationFields,
	registrationOperations,
} from './descriptions';
import { GODADDY_API_VERSION } from './registry';
import { MOCKS } from './mocks';
import { buildRequest } from './request';

/**
 * GoDaddy Domains v3 — programmatic node.
 *
 * 오퍼레이션 정의(descriptions/, registry.ts)는 공식 OpenAPI 스펙에서
 * scripts/generate.mjs 로 생성된다. execute() 는 registry 기반의 generic
 * 실행기 하나로 모든 오퍼레이션을 처리한다. 스펙 변경 시
 * `npm run fetch-spec && npm run generate` 로 재생성.
 */
export class GoDaddy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GoDaddy',
		name: 'goDaddy',
		icon: { light: 'file:godaddy.svg', dark: 'file:godaddy.svg' },
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Search, register, and manage domains and DNS records via the GoDaddy Domains v3 API. Generated from the official OpenAPI spec v${GODADDY_API_VERSION}. Turn on Mock Data to get sample responses without a credential.`,
		defaults: { name: 'GoDaddy' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		// Mock Data 가 꺼진 실 호출 시에만 credential 필요 (mock 모드는 credential 없이 동작)
		credentials: [
			{
				name: 'goDaddyApi',
				required: true,
				displayOptions: { show: { mockData: [false] } },
			},
		],
		properties: [
			{
				displayName: 'Mock Data',
				name: 'mockData',
				type: 'boolean',
				default: false,
				description:
					'Whether to return a sample response generated from the GoDaddy API spec instead of calling the API. No credential needed. Useful for building workflows before wiring a real account.',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Discovery', value: 'discovery' },
					{ name: 'DNS Record', value: 'dnsRecord' },
					{ name: 'Domain', value: 'domain' },
					{ name: 'Operation', value: 'operation' },
					{ name: 'Registration', value: 'registration' },
				],
				default: 'discovery',
			},

			discoveryOperations,
			dnsRecordOperations,
			domainOperations,
			operationOperations,
			registrationOperations,

			...discoveryFields,
			...dnsRecordFields,
			...domainFields,
			...operationFields,
			...registrationFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const mockData = this.getNodeParameter('mockData', 0, false) as boolean;
		let baseUrl = '';
		if (!mockData) {
			const environment = (await this.getCredentials('goDaddyApi')).environment as string;
			baseUrl = environment === 'ote' ? 'https://api.ote-godaddy.com' : 'https://api.godaddy.com';
		}

		for (let i = 0; i < items.length; i++) {
			try {
				if (mockData) {
					const resource = this.getNodeParameter('resource', i) as string;
					const operation = this.getNodeParameter('operation', i) as string;
					const mock = MOCKS[`${resource}.${operation}`] ?? { success: true };
					const mockRows: unknown[] = Array.isArray(mock) ? mock : [mock];
					for (const row of mockRows) {
						returnData.push({
							json: row as INodeExecutionData['json'],
							pairedItem: { item: i },
						});
					}
					continue;
				}

				const { method, path, qs, body } = buildRequest(this, i);

				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'goDaddyApi', {
					method,
					url: `${baseUrl}/v3/domains${path}`,
					qs,
					body: body as IDataObject | IDataObject[] | undefined,
					json: true,
				});

				const rows: unknown[] = Array.isArray(response) ? response : [response ?? { success: true }];
				for (const row of rows) {
					returnData.push({
						json: row as INodeExecutionData['json'],
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
					continue;
				}
				if (error instanceof NodeApiError) throw error;
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
