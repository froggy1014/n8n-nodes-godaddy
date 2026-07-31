import {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * GoDaddy API 인증 (Bearer Personal Access Token).
 *
 * PAT 은 developer.godaddy.com 대시보드에서 발급. 프로덕션과 OTE(테스트)
 * 환경이 분리되어 있으며, 과금이 발생하는 쓰기 작업은 OTE 로 먼저 검증할 것.
 */
export class GoDaddyApi implements ICredentialType {
	name = 'goDaddyApi';

	displayName = 'GoDaddy API';

	icon: Icon = 'file:godaddy.svg';

	documentationUrl = 'https://developer.godaddy.com/docs/api-users/auth/how-to';

	properties: INodeProperties[] = [
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{ name: 'Production (api.godaddy.com)', value: 'production' },
				{ name: 'OTE Test (api.ote-godaddy.com)', value: 'ote' },
			],
			default: 'production',
			description:
				'OTE is a sandbox — use it for registration/purchase testing so no real charges occur',
		},
		{
			displayName: 'Personal Access Token',
			name: 'personalAccessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'PAT generated from the GoDaddy developer dashboard',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.personalAccessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL:
				'={{$credentials.environment === "ote" ? "https://api.ote-godaddy.com" : "https://api.godaddy.com"}}',
			url: '/v3/domains/check-availability',
			qs: { domain: 'example.com' },
		},
	};
}
