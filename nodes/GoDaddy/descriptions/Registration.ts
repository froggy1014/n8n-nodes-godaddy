// GENERATED FILE — do not edit by hand.
// Source: GoDaddy Domains v3 OpenAPI spec v3.1.0 (scripts/spec/domains-v3.json)
// Regenerate with: npm run generate
/* eslint-disable */
import type { INodeProperties } from 'n8n-workflow';

export const registrationOperations: INodeProperties = {
	displayName: "Operation",
	name: "operation",
	type: "options",
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				"registration",
			],
		},
	},
	options: [
		{
			name: "Get",
			value: "get",
			action: "Get a registration record",
			description: "Get a registration record",
		},
		{
			name: "Quote",
			value: "quote",
			action: "Quote a domain registration",
			description: "Quote a single-domain registration (no commitment)",
		},
		{
			name: "Register",
			value: "register",
			action: "Register a domain",
			description: "Register a domain (requires quoteToken)",
		},
	],
	default: "get",
};

export const registrationFields: INodeProperties[] = [
	{
		displayName: "Registration ID",
		name: "registrationId",
		type: "string",
		default: "",
		description: "Server-assigned registration identifier.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"registration",
				],
				operation: [
					"get",
				],
			},
		},
	},
	{
		displayName: "Domain",
		name: "domain",
		type: "string",
		default: "",
		description: "The domain name to quote, in punycode A-label form.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"registration",
				],
				operation: [
					"quote",
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
					"registration",
				],
				operation: [
					"quote",
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
		],
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
					"registration",
				],
				operation: [
					"quote",
				],
			},
		},
		options: [
			{
				displayName: "Period",
				name: "period",
				type: "number",
				default: 1,
				description: "Registration period in years. If supplied, the same value must be re-supplied on /registrations.",
			},
			{
				displayName: "Profile",
				name: "profile",
				type: "json",
				default: "{}",
				description: "A one-time, non-persisted set of contacts and purchase preference defaults supplied inline on a quote or execute request. Use to provide registration data for this transaction without creating or updating a saved registration profile. Shared by the registration quote and execute request bodies. Every field is optional. Omitted fields account identity or other default values. Provided fields override only what is supplied — contact roles replace as a whole block; preference fields replace individually. This is not a saved registration profile and is not JSON Patch. Data here applies only to the current quote or registration request.",
			},
			{
				displayName: "Profile ID",
				name: "profileId",
				type: "string",
				default: "",
				description: "A universally unique identifier (UUID) in [RFC-4122 format](https://tools.ietf.org/html/rfc4122).",
			},
		],
	},
	{
		displayName: "Domain",
		name: "domain",
		type: "string",
		default: "",
		description: "The domain name to register, in punycode A-label form for IDNs. Must match the domain in the quoteToken.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"registration",
				],
				operation: [
					"register",
				],
			},
		},
	},
	{
		displayName: "Quote Token",
		name: "quoteToken",
		type: "string",
		default: "",
		description: "A universally unique identifier (UUID) in [RFC-4122 format](https://tools.ietf.org/html/rfc4122).",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"registration",
				],
				operation: [
					"register",
				],
			},
		},
	},
	{
		displayName: "Consent",
		name: "consent",
		type: "json",
		default: "{}",
		description: "Customer consent record for a domain operation, capturing which legal agreements were accepted, when, and by whom. On execute, the caller supplies agreementTypes and agreedAt. The server derives agreedBy from the authenticated request context (OAuth identity, X-Shopper-Id, client IP, and transmission channel).",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"registration",
				],
				operation: [
					"register",
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
					"registration",
				],
				operation: [
					"register",
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
		],
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
					"registration",
				],
				operation: [
					"register",
				],
			},
		},
		options: [
			{
				displayName: "Created At",
				name: "createdAt",
				type: "string",
				default: "",
				description: "A date and time, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6). Note: The regular expression provides static schematic guidance but does not reject all invalid dates.",
			},
			{
				displayName: "Expires At",
				name: "expiresAt",
				type: "string",
				default: "",
				description: "A date and time, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6). Note: The regular expression provides static schematic guidance but does not reject all invalid dates.",
			},
			{
				displayName: "Operation ID",
				name: "operationId",
				type: "string",
				default: "",
				description: "A universally unique identifier (UUID) in [RFC-4122 format](https://tools.ietf.org/html/rfc4122).",
			},
			{
				displayName: "Period",
				name: "period",
				type: "number",
				default: 1,
				description: "Registration period in years. Must match the period in the quote.",
			},
			{
				displayName: "Profile",
				name: "profile",
				type: "json",
				default: "{}",
				description: "A one-time, non-persisted set of contacts and purchase preference defaults supplied inline on a quote or execute request. Use to provide registration data for this transaction without creating or updating a saved registration profile. Shared by the registration quote and execute request bodies. Every field is optional. Omitted fields account identity or other default values. Provided fields override only what is supplied — contact roles replace as a whole block; preference fields replace individually. This is not a saved registration profile and is not JSON Patch. Data here applies only to the current quote or registration request.",
			},
			{
				displayName: "Profile ID",
				name: "profileId",
				type: "string",
				default: "",
				description: "A universally unique identifier (UUID) in [RFC-4122 format](https://tools.ietf.org/html/rfc4122).",
			},
			{
				displayName: "Registration ID",
				name: "registrationId",
				type: "string",
				default: "",
				description: "A universally unique identifier (UUID) in [RFC-4122 format](https://tools.ietf.org/html/rfc4122).",
			},
			{
				displayName: "Status",
				name: "status",
				type: "string",
				default: "",
				description: "The execution state of an asynchronous domain operation. CONFIRMED — operation has been accepted and is queued for execution. EXECUTING — operation is actively being processed by the registry or downstream systems. COMPLETED — operation finished successfully; result data is available. FAILED — operation terminated with an unrecoverable error; error detail is attached.",
			},
			{
				displayName: "Updated At",
				name: "updatedAt",
				type: "string",
				default: "",
				description: "A date and time, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6). Note: The regular expression provides static schematic guidance but does not reject all invalid dates.",
			},
		],
	},
];
