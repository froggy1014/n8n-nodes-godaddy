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
