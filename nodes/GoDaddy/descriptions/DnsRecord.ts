// GENERATED FILE — do not edit by hand.
// Source: GoDaddy Domains v3 OpenAPI spec v3.1.0 (scripts/spec/domains-v3.json)
// Regenerate with: npm run generate
/* eslint-disable */
import type { INodeProperties } from 'n8n-workflow';

export const dnsRecordOperations: INodeProperties = {
	displayName: "Operation",
	name: "operation",
	type: "options",
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				"dnsRecord",
			],
		},
	},
	options: [
		{
			name: "Create",
			value: "create",
			action: "Create a DNS record",
			description: "Create a DNS record for a zone",
		},
		{
			name: "Delete",
			value: "delete",
			action: "Delete a DNS record",
			description: "Delete a DNS record",
		},
		{
			name: "List",
			value: "list",
			action: "List DNS records in a zone",
			description: "List DNS records in a zone",
		},
	],
	default: "create",
};

export const dnsRecordFields: INodeProperties[] = [
	{
		displayName: "Zone",
		name: "zone",
		type: "string",
		default: "",
		description: "The domain name in punycode A-label form (for example, example.com). For IDNs, use the punycode representation.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"dnsRecord",
				],
				operation: [
					"create",
				],
			},
		},
	},
	{
		displayName: "Name",
		name: "name",
		type: "string",
		default: "",
		description: "The DNS record name relative to the zone apex. Use @ to represent the zone apex itself (e.g. the bare domain example.com).",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"dnsRecord",
				],
				operation: [
					"create",
				],
			},
		},
	},
	{
		displayName: "Type",
		name: "type",
		type: "options",
		options: [
			{
				name: "A",
				value: "A",
			},
			{
				name: "AAAA",
				value: "AAAA",
			},
			{
				name: "ALIAS",
				value: "ALIAS",
			},
			{
				name: "CAA",
				value: "CAA",
			},
			{
				name: "CNAME",
				value: "CNAME",
			},
			{
				name: "MX",
				value: "MX",
			},
			{
				name: "NS",
				value: "NS",
			},
			{
				name: "SOA",
				value: "SOA",
			},
			{
				name: "SRV",
				value: "SRV",
			},
			{
				name: "TXT",
				value: "TXT",
			},
		],
		default: "A",
		description: "The DNS resource record type. A — IPv4 address record. AAAA — IPv6 address record. CNAME — canonical name alias record; not permitted at the zone apex. MX — mail exchange routing record. TXT — arbitrary text record, used for SPF, DKIM, and domain verification. NS — authoritative name server delegation record. SRV — service locator record. SOA — start of authority record. CAA — certification authority authorization record. ALIAS — GoDaddy-specific apex-safe CNAME-like record.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"dnsRecord",
				],
				operation: [
					"create",
				],
			},
		},
	},
	{
		displayName: "Data",
		name: "data",
		type: "string",
		default: "",
		description: "The record value. Format is type-specific — for example, an IPv4 address for A records, or a hostname for CNAME and MX records.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"dnsRecord",
				],
				operation: [
					"create",
				],
			},
		},
	},
	{
		displayName: "TTL",
		name: "ttl",
		type: "number",
		default: 0,
		description: "Time-to-live in seconds. Controls how long resolvers cache this record.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"dnsRecord",
				],
				operation: [
					"create",
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
					"dnsRecord",
				],
				operation: [
					"create",
				],
			},
		},
		options: [
			{
				displayName: "Flag",
				name: "flag",
				type: "number",
				default: 0,
				description: "Flag byte for CAA records. 0 indicates non-critical; 128 indicates critical (the issuer must understand the tag property to proceed).",
			},
			{
				displayName: "Port",
				name: "port",
				type: "number",
				default: 0,
				description: "Port number for SRV records",
			},
			{
				displayName: "Priority",
				name: "priority",
				type: "number",
				default: 0,
				description: "Priority value for MX and SRV records. Lower values are preferred.",
			},
			{
				displayName: "Protocol",
				name: "protocol",
				type: "string",
				default: "",
				description: "Protocol identifier for SRV records (e.g. _tcp, _udp).",
			},
			{
				displayName: "Service",
				name: "service",
				type: "string",
				default: "",
				description: "Service label for SRV records (e.g. _http).",
			},
			{
				displayName: "Tag",
				name: "tag",
				type: "string",
				default: "",
				description: "Tag property for CAA records. Common values: issue, issuewild, iodef.",
			},
			{
				displayName: "Weight",
				name: "weight",
				type: "number",
				default: 0,
				description: "Weight for SRV load balancing among records with equal priority. Higher weight increases the probability of selection.",
			},
		],
	},
	{
		displayName: "Zone",
		name: "zone",
		type: "string",
		default: "",
		description: "The domain name in punycode A-label form (for example, example.com). For IDNs, use the punycode representation.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"dnsRecord",
				],
				operation: [
					"delete",
				],
			},
		},
	},
	{
		displayName: "Record ID",
		name: "recordId",
		type: "string",
		default: "",
		description: "Server-assigned DNS record identifier within the zone",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"dnsRecord",
				],
				operation: [
					"delete",
				],
			},
		},
	},
	{
		displayName: "Zone",
		name: "zone",
		type: "string",
		default: "",
		description: "The domain name in punycode A-label form (for example, example.com). For IDNs, use the punycode representation.",
		required: true,
		displayOptions: {
			show: {
				resource: [
					"dnsRecord",
				],
				operation: [
					"list",
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
					"dnsRecord",
				],
				operation: [
					"list",
				],
			},
		},
		options: [
			{
				displayName: "Fields",
				name: "fields",
				type: "string",
				default: "",
				description: "Comma-separated list of fields to include in each item of the response. Omitted fields are excluded from the payload. When absent, all fields are returned. Field names must match properties defined on the item schema for the operation; any unknown or invalid name returns 400 Bad Request.",
			},
			{
				displayName: "Name",
				name: "name",
				type: "string",
				default: "",
				description: "Filter results to records with this host name relative to the zone. Use `@` for the zone apex.",
			},
			{
				displayName: "Page",
				name: "page",
				type: "number",
				default: 1,
				description: "One-based page number for offset-based pagination. Defaults to 1.",
			},
			{
				displayName: "Page Size",
				name: "pageSize",
				type: "number",
				default: 25,
				description: "Maximum number of items to return per page",
			},
			{
				displayName: "Total Required",
				name: "totalRequired",
				type: "boolean",
				default: false,
				description: "Whether when true, the response includes totalItems and totalPages for the current filter when at least one record matches. Both are omitted when the result set is empty. Defaults to false; omitting totals avoids the cost of a count query on large collections.",
			},
			{
				displayName: "Type",
				name: "type",
				type: "options",
				options: [
					{
						name: "A",
						value: "A",
					},
					{
						name: "AAAA",
						value: "AAAA",
					},
					{
						name: "ALIAS",
						value: "ALIAS",
					},
					{
						name: "CAA",
						value: "CAA",
					},
					{
						name: "CNAME",
						value: "CNAME",
					},
					{
						name: "MX",
						value: "MX",
					},
					{
						name: "NS",
						value: "NS",
					},
					{
						name: "SOA",
						value: "SOA",
					},
					{
						name: "SRV",
						value: "SRV",
					},
					{
						name: "TXT",
						value: "TXT",
					},
				],
				default: "A",
				description: "Filter results to records of this DNS type",
			},
		],
	},
];
