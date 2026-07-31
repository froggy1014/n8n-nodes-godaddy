// GENERATED FILE — do not edit by hand.
// Source: GoDaddy Domains v3 OpenAPI spec v3.1.0 (scripts/spec/domains-v3.json)
// Regenerate with: npm run generate
/* eslint-disable */
export interface RegistryParam {
	/** Parameter name in the GoDaddy API ('' for fullBody) */
	api: string;
	/** Parameter name in the n8n UI */
	param: string;
	in: 'path' | 'query' | 'body' | 'fullBody';
	required: boolean;
	/** True when the UI exposes this as a raw-JSON field that must be parsed */
	json: boolean;
}

export interface RegistryEntry {
	method: string;
	path: string;
	params: RegistryParam[];
}

export const GODADDY_API_VERSION = "3.1.0";

export const REGISTRY: Record<string, RegistryEntry> = {
	"discovery.checkAvailability": {
		method: "GET",
		path: "/check-availability",
		params: [
			{
				api: "domain",
				param: "domain",
				in: "query",
				required: true,
				json: false,
			},
			{
				api: "optimizeFor",
				param: "optimizeFor",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "iscCode",
				param: "iscCode",
				in: "query",
				required: false,
				json: false,
			},
		],
	},
	"discovery.suggest": {
		method: "GET",
		path: "/suggestions",
		params: [
			{
				api: "query",
				param: "query",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "tlds",
				param: "tlds",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "lengthMax",
				param: "lengthMax",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "lengthMin",
				param: "lengthMin",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "pageSize",
				param: "pageSize",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "sources",
				param: "sources",
				in: "query",
				required: false,
				json: false,
			},
		],
	},
	"registration.get": {
		method: "GET",
		path: "/registrations/{registrationId}",
		params: [
			{
				api: "registrationId",
				param: "registrationId",
				in: "path",
				required: true,
				json: false,
			},
		],
	},
	"registration.quote": {
		method: "POST",
		path: "/registration-quotes",
		params: [
			{
				api: "iscCode",
				param: "iscCode",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "domain",
				param: "domain",
				in: "body",
				required: true,
				json: false,
			},
			{
				api: "period",
				param: "period",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "profileId",
				param: "profileId",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "profile",
				param: "profile",
				in: "body",
				required: false,
				json: true,
			},
		],
	},
	"registration.register": {
		method: "POST",
		path: "/registrations",
		params: [
			{
				api: "iscCode",
				param: "iscCode",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "registrationId",
				param: "registrationId",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "domain",
				param: "domain",
				in: "body",
				required: true,
				json: false,
			},
			{
				api: "period",
				param: "period",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "profileId",
				param: "profileId",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "profile",
				param: "profile",
				in: "body",
				required: false,
				json: true,
			},
			{
				api: "quoteToken",
				param: "quoteToken",
				in: "body",
				required: true,
				json: false,
			},
			{
				api: "consent",
				param: "consent",
				in: "body",
				required: true,
				json: true,
			},
			{
				api: "status",
				param: "status",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "operationId",
				param: "operationId",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "expiresAt",
				param: "expiresAt",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "createdAt",
				param: "createdAt",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "updatedAt",
				param: "updatedAt",
				in: "body",
				required: false,
				json: false,
			},
		],
	},
	"domain.get": {
		method: "GET",
		path: "/domain-names/{domain-name}",
		params: [
			{
				api: "domain-name",
				param: "domainName",
				in: "path",
				required: true,
				json: false,
			},
		],
	},
	"domain.updateNameservers": {
		method: "PUT",
		path: "/domain-names/{domain-name}/nameservers",
		params: [
			{
				api: "domain-name",
				param: "domainName",
				in: "path",
				required: true,
				json: false,
			},
			{
				api: "",
				param: "requestBody",
				in: "fullBody",
				required: true,
				json: true,
			},
		],
	},
	"dnsRecord.create": {
		method: "POST",
		path: "/zones/{zone}/dns-records",
		params: [
			{
				api: "zone",
				param: "zone",
				in: "path",
				required: true,
				json: false,
			},
			{
				api: "name",
				param: "name",
				in: "body",
				required: true,
				json: false,
			},
			{
				api: "type",
				param: "type",
				in: "body",
				required: true,
				json: false,
			},
			{
				api: "data",
				param: "data",
				in: "body",
				required: true,
				json: false,
			},
			{
				api: "ttl",
				param: "ttl",
				in: "body",
				required: true,
				json: false,
			},
			{
				api: "priority",
				param: "priority",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "service",
				param: "service",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "port",
				param: "port",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "weight",
				param: "weight",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "protocol",
				param: "protocol",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "flag",
				param: "flag",
				in: "body",
				required: false,
				json: false,
			},
			{
				api: "tag",
				param: "tag",
				in: "body",
				required: false,
				json: false,
			},
		],
	},
	"dnsRecord.delete": {
		method: "DELETE",
		path: "/zones/{zone}/dns-records/{recordId}",
		params: [
			{
				api: "zone",
				param: "zone",
				in: "path",
				required: true,
				json: false,
			},
			{
				api: "recordId",
				param: "recordId",
				in: "path",
				required: true,
				json: false,
			},
		],
	},
	"dnsRecord.list": {
		method: "GET",
		path: "/zones/{zone}/dns-records",
		params: [
			{
				api: "zone",
				param: "zone",
				in: "path",
				required: true,
				json: false,
			},
			{
				api: "page",
				param: "page",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "pageSize",
				param: "pageSize",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "totalRequired",
				param: "totalRequired",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "fields",
				param: "fields",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "type",
				param: "type",
				in: "query",
				required: false,
				json: false,
			},
			{
				api: "name",
				param: "name",
				in: "query",
				required: false,
				json: false,
			},
		],
	},
	"operation.get": {
		method: "GET",
		path: "/operations/{operationId}",
		params: [
			{
				api: "operationId",
				param: "operationId",
				in: "path",
				required: true,
				json: false,
			},
		],
	},
};
