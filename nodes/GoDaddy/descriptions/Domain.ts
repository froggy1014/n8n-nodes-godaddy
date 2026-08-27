// GENERATED FILE — do not edit by hand.
// Source: GoDaddy Domains v3 OpenAPI spec v3.1.0 (scripts/spec/domains-v3.json)
// Regenerate with: npm run generate
/* eslint-disable */
import type { INodeProperties } from 'n8n-workflow';

export const domainOperations: INodeProperties = {
	displayName: "Operation",
	name: "operation",
	type: "options",
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				"domain",
			],
		},
	},
	options: [
		{
			name: "Get",
			value: "get",
			action: "Get a registered domain",
			description: "Get a registered domain",
		},
		{
			name: "List",
			value: "list",
			action: "List registered domains",
			description: "List registered domains",
		},
		{
			name: "Update Nameservers",
			value: "updateNameservers",
			action: "Replace the nameservers for a domain",
			description: "Replace the nameservers for a domain",
		},
	],
	default: "get",
};

export const domainFields: INodeProperties[] = [
	{
		displayName: "Domain Name",
		name: "domainName",
		type: "string",
		default: "",
		description: "The domain name in punycode A-label form (e.g., example.com). For IDNs, use the punycode representation.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"domain",
				],
				operation: [
					"get",
				],
			},
		},
	},
	{
		displayName: "Query Parameters",
		name: "queryParameters",
		type: "collection",
		placeholder: "Add Parameter",
		default: {},
		displayOptions: {
			show: {
				resource: [
					"domain",
				],
				operation: [
					"list",
				],
			},
		},
		options: [
			{
				displayName: "Expires Before",
				name: "expiresBefore",
				type: "string",
				default: "",
				description: "Return only domains whose registration expires before this timestamp (exclusive). Must be a valid RFC 3339 date-time.",
			},
			{
				displayName: "Lifecycle Groups",
				name: "lifecycleGroups",
				type: "string",
				default: "",
				description: "Filter results to domains belonging to one or more status groups. Supply multiple values as a single comma-separated list, e.g. `?lifecycleGroups=REGISTERED,PENDING`. Multiple values are combined with logical OR. Cannot be combined with the statuses parameter. Use this for coarse lifecycle phases that remain stable as new statuses are added; for precise filtering, use statuses. Comma-separated list.",
			},
			{
				displayName: "Page Size",
				name: "pageSize",
				type: "number",
				default: 100,
				description: "Maximum number of domains in the response. Defaults to 100 when omitted. Offset-based \"page\" parameter is not supported, only cursor-based \"pageToken\".",
			},
			{
				displayName: "Page Token",
				name: "pageToken",
				type: "string",
				default: "",
				description: "Opaque cursor from the links[rel=next or rel=prev] href of the previous page. When present, the response begins immediately after the item that produced the token. Omit to start from the beginning of the collection.",
				typeOptions: {
					password: true,
				},
			},
			{
				displayName: "Page Token Direction",
				name: "pageTokenDirection",
				type: "options",
				options: [
					{
						name: "Backward",
						value: "backward",
					},
					{
						name: "Forward",
						value: "forward",
					},
				],
				default: "backward",
				description: "Optional token direction when `pageToken` is set; ignored otherwise",
			},
			{
				displayName: "Statuses",
				name: "statuses",
				type: "string",
				default: "",
				description: "Filter results to domains with one or more lifecycle statuses. Supply multiple values as a single comma-separated list, e.g. `?statuses=ACTIVE,EXPIRED`. Multiple values are combined with logical OR — returns domains matching ANY of the specified statuses. See DomainStatus for accepted values (ACTIVE, EXPIRED, PENDING_REGISTRATION, etc.). Cannot be combined with the lifecycleGroups parameter. Use this for precise filtering on specific known status values; for coarse lifecycle phases, consider lifecycleGroups. Comma-separated list.",
			},
			{
				displayName: "Updated After",
				name: "updatedAfter",
				type: "string",
				default: "",
				description: "Return only domains last updated after this timestamp (exclusive). Must be a valid RFC 3339 date-time.",
			},
		],
	},
	{
		displayName: "Domain Name",
		name: "domainName",
		type: "string",
		default: "",
		description: "The domain name in punycode A-label form (e.g., example.com). For IDNs, use the punycode representation.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"domain",
				],
				operation: [
					"updateNameservers",
				],
			},
		},
	},
	{
		displayName: "Request Body",
		name: "requestBody",
		type: "json",
		default: "[]",
		description: "Ordered list of authoritative nameserver hostnames for a domain. The first entry is primary; subsequent entries are secondaries. A minimum of two nameservers is required; the maximum is thirteen.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"domain",
				],
				operation: [
					"updateNameservers",
				],
			},
		},
	},
];
