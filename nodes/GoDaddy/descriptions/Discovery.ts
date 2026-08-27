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
			name: "Check Availability (Bulk)",
			value: "checkAvailabilityBulk",
			action: "Check availability of several domains at once",
			description: "Check availability of one or more specific domains",
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
		description: "The domain name to check, in punycode A-label form for IDNs",
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
						name: "ACCURACY",
						value: "ACCURACY",
					},
					{
						name: "SPEED",
						value: "SPEED",
					},
				],
				default: "SPEED",
				description: "Optional. When omitted, defaults to SPEED. Availability is always re-verified authoritatively at quote time regardless of this setting.",
			},
		],
	},
	{
		displayName: "Domains",
		name: "domains",
		type: "json",
		default: "[]",
		description: "List of 1–25 domain names to check, in punycode A-label form for IDNs",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"discovery",
				],
				operation: [
					"checkAvailabilityBulk",
				],
			},
		},
	},
	{
		displayName: "Additional Fields",
		name: "additionalFields",
		type: "collection",
		placeholder: "Add Field",
		default: {},
		displayOptions: {
			show: {
				resource: [
					"discovery",
				],
				operation: [
					"checkAvailabilityBulk",
				],
			},
		},
		options: [
			{
				displayName: "Isc Code",
				name: "iscCode",
				type: "string",
				default: "",
				description: "Reseller ISC (International Shopper Code) for pricing context. When provided, the indicative prices in the results reflect the applicable reseller rates for this ISC.",
			},
			{
				displayName: "Optimize For",
				name: "optimizeFor",
				type: "options",
				options: [
					{
						name: "ACCURACY",
						value: "ACCURACY",
					},
					{
						name: "SPEED",
						value: "SPEED",
					},
				],
				default: "SPEED",
				description: "How an availability check should prioritize speed vs. authoritative accuracy. SPEED — use cached zone data for a fast response (may be slightly stale). ACCURACY — perform a live registry check for authoritative availability (higher latency).",
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
				description: "Maximum length of second-level domain",
			},
			{
				displayName: "Length Min",
				name: "lengthMin",
				type: "number",
				default: 0,
				description: "Minimum length of second-level domain",
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
				description: "Suggestion source strategies to activate. Comma-separated list.",
			},
			{
				displayName: "TLDs",
				name: "tlds",
				type: "string",
				default: "",
				description: "Top-level domains to be included in suggestions. Comma-separated list.",
			},
		],
	},
];
