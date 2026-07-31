// GENERATED FILE — do not edit by hand.
// Source: GoDaddy Domains v3 OpenAPI spec v3.1.0 (scripts/spec/domains-v3.json)
// Regenerate with: npm run generate
/* eslint-disable */
import type { INodeProperties } from 'n8n-workflow';

export const discoveryOperations: INodeProperties = {
	displayName: "Operation",
	name: "operation",
	type: "options",
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				"discovery",
			],
		},
	},
	options: [
		{
			name: "Check Availability",
			value: "checkAvailability",
			action: "Check availability of a domain",
			description: "Check availability of a single domain",
		},
		{
			name: "Suggest",
			value: "suggest",
			action: "Suggest available domains",
			description: "Suggest available domains for a query",
		},
	],
	default: "checkAvailability",
};

export const discoveryFields: INodeProperties[] = [
	{
		displayName: "Domain",
		name: "domain",
		type: "string",
		default: "",
		description: "The domain name to check, in punycode A-label form for IDNs.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"discovery",
				],
				operation: [
					"checkAvailability",
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
					"discovery",
				],
				operation: [
					"checkAvailability",
				],
			},
		},
		options: [
			{
				displayName: "Isc Code",
				name: "iscCode",
				type: "string",
				default: "",
				description: "ISC (International Shopper Code) for pricing context. When provided, prices reflect the applicable rates for this ISC.",
			},
			{
				displayName: "Optimize For",
				name: "optimizeFor",
				type: "options",
				options: [
					{
						name: "SPEED",
						value: "SPEED",
					},
					{
						name: "ACCURACY",
						value: "ACCURACY",
					},
				],
				default: "SPEED",
				description: "Optional. When omitted, defaults to SPEED. Availability is always re-verified authoritatively at quote time regardless of this setting.",
			},
		],
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
					"discovery",
				],
				operation: [
					"suggest",
				],
			},
		},
		options: [
			{
				displayName: "Length Max",
				name: "lengthMax",
				type: "number",
				default: 0,
				description: "Maximum length of second-level domain.",
			},
			{
				displayName: "Length Min",
				name: "lengthMin",
				type: "number",
				default: 0,
				description: "Minimum length of second-level domain.",
			},
			{
				displayName: "Page Size",
				name: "pageSize",
				type: "number",
				default: 10,
				description: "Maximum number of suggestions in the response. Defaults to 10 when omitted.",
			},
			{
				displayName: "Query",
				name: "query",
				type: "string",
				default: "",
				description: "Natural-language query or keywords describing the desired domain, e.g. \"sunrise bakery\". Used to generate creative and keyword-spin suggestions.",
			},
			{
				displayName: "Sources",
				name: "sources",
				type: "string",
				default: "",
				description: "Suggestion source strategies to activate. (comma-separated list)",
			},
			{
				displayName: "TLDs",
				name: "tlds",
				type: "string",
				default: "",
				description: "Top-level domains to be included in suggestions. (comma-separated list)",
			},
		],
	},
];
