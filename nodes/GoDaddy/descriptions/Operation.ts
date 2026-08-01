// GENERATED FILE — do not edit by hand.
// Source: GoDaddy Domains v3 OpenAPI spec v3.1.0 (scripts/spec/domains-v3.json)
// Regenerate with: npm run generate
/* eslint-disable */
import type { INodeProperties } from 'n8n-workflow';

export const operationOperations: INodeProperties = {
	displayName: "Operation",
	name: "operation",
	type: "options",
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				"operation",
			],
		},
	},
	options: [
		{
			name: "Get",
			value: "get",
			action: "Poll an async domain operation",
			description: "Poll an async domain operation",
		},
	],
	default: "get",
};

export const operationFields: INodeProperties[] = [
	{
		displayName: "Operation ID",
		name: "operationId",
		type: "string",
		default: "",
		description: "The server-assigned operation identifier returned in the 202 response of any async domain mutation",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"operation",
				],
				operation: [
					"get",
				],
			},
		},
	},
];
