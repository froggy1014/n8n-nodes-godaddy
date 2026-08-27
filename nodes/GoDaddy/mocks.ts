// GENERATED FILE — do not edit by hand.
// Source: GoDaddy Domains v3 OpenAPI spec v3.1.0 (scripts/spec/domains-v3.json)
// Regenerate with: npm run generate
/* eslint-disable */
export const MOCKS: Record<string, unknown> = {
	"discovery.checkAvailability": {
		"domain": "example.com",
		"unicodeDomain": "münchen.de",
		"available": false,
		"definitive": false,
		"inventory": "REGISTRY",
		"prices": [
			{
				"term": "YEAR",
				"period": 1,
				"price": {
					"currencyCode": "USD",
					"value": 0
				},
				"renewalPrice": {
					"currencyCode": "USD",
					"value": 0
				},
				"firstTermPrice": {
					"currencyCode": "USD",
					"value": 0
				},
				"recommended": true,
				"fees": [
					{
						"type": "string",
						"fee": {
							"currencyCode": "USD",
							"value": 0
						}
					}
				]
			}
		],
		"error": {
			"name": "example",
			"correlationId": "string",
			"message": "string",
			"informationLink": "string",
			"details": [
				{
					"field": "string",
					"value": "string",
					"location": "string",
					"issue": "string",
					"description": "string"
				}
			],
			"links": [
				{
					"href": "https://api.godaddy.com/v3/domains/example",
					"rel": "string",
					"title": "string",
					"targetMediaType": "string",
					"targetSchema": "string",
					"method": "string",
					"submissionMediaType": "string",
					"submissionSchema": "string"
				}
			]
		}
	},
	"discovery.checkAvailabilityBulk": {
		"items": [
			{
				"domain": "example.com",
				"unicodeDomain": "münchen.de",
				"available": false,
				"definitive": false,
				"inventory": "REGISTRY",
				"prices": [
					{
						"term": "YEAR",
						"period": 1,
						"price": {
							"currencyCode": "USD",
							"value": 0
						},
						"renewalPrice": {
							"currencyCode": "USD",
							"value": 0
						},
						"firstTermPrice": {
							"currencyCode": "USD",
							"value": 0
						},
						"recommended": true,
						"fees": [
							{
								"type": "string",
								"fee": {
									"currencyCode": "USD",
									"value": 0
								}
							}
						]
					}
				],
				"error": {
					"name": "example",
					"correlationId": "string",
					"message": "string",
					"informationLink": "string",
					"details": [
						{
							"field": "string",
							"value": "string",
							"location": "string",
							"issue": "string",
							"description": "string"
						}
					],
					"links": [
						{
							"href": "https://api.godaddy.com/v3/domains/example",
							"rel": "string",
							"title": "string",
							"targetMediaType": "string",
							"targetSchema": "string",
							"method": "string",
							"submissionMediaType": "string",
							"submissionSchema": "string"
						}
					]
				}
			}
		]
	},
	"discovery.suggest": {
		"items": [
			{
				"domain": "sunrisebakery.com",
				"prices": [
					{
						"term": "YEAR",
						"period": 1,
						"price": {
							"currencyCode": "USD",
							"value": 0
						},
						"renewalPrice": {
							"currencyCode": "USD",
							"value": 0
						},
						"firstTermPrice": {
							"currencyCode": "USD",
							"value": 0
						},
						"recommended": true,
						"fees": [
							{
								"type": "string",
								"fee": {
									"currencyCode": "USD",
									"value": 0
								}
							}
						]
					}
				],
				"inventory": "REGISTRY"
			}
		]
	},
	"registration.get": {
		"registrationId": "00000000-0000-4000-8000-000000000000",
		"domain": "example.com",
		"period": 1,
		"profileId": "00000000-0000-4000-8000-000000000000",
		"profile": {
			"contacts": {
				"registrant": {
					"firstName": "Jane",
					"lastName": "Smith",
					"organization": "Example LLC",
					"email": "user@example.com",
					"phone": {
						"countryCode": "string",
						"nationalNumber": "string",
						"extensionNumber": "string"
					},
					"address": {
						"line1": "string",
						"line2": "string",
						"city": "string",
						"state": "string",
						"countryCode": "string",
						"postalCode": "string"
					}
				},
				"admin": {
					"firstName": "Jane",
					"lastName": "Smith",
					"organization": "Example LLC",
					"email": "user@example.com",
					"phone": {
						"countryCode": "string",
						"nationalNumber": "string",
						"extensionNumber": "string"
					},
					"address": {
						"line1": "string",
						"line2": "string",
						"city": "string",
						"state": "string",
						"countryCode": "string",
						"postalCode": "string"
					}
				},
				"tech": {
					"firstName": "Jane",
					"lastName": "Smith",
					"organization": "Example LLC",
					"email": "user@example.com",
					"phone": {
						"countryCode": "string",
						"nationalNumber": "string",
						"extensionNumber": "string"
					},
					"address": {
						"line1": "string",
						"line2": "string",
						"city": "string",
						"state": "string",
						"countryCode": "string",
						"postalCode": "string"
					}
				},
				"billing": {
					"firstName": "Jane",
					"lastName": "Smith",
					"organization": "Example LLC",
					"email": "user@example.com",
					"phone": {
						"countryCode": "string",
						"nationalNumber": "string",
						"extensionNumber": "string"
					},
					"address": {
						"line1": "string",
						"line2": "string",
						"city": "string",
						"state": "string",
						"countryCode": "string",
						"postalCode": "string"
					}
				}
			},
			"autoRenew": false,
			"privacy": false,
			"nameServers": [
				"ns1.example.com",
				"ns2.example.com"
			]
		},
		"quoteToken": "00000000-0000-4000-8000-000000000000",
		"consent": {
			"agreementTypes": [
				"API_DPA"
			],
			"agreedAt": "string",
			"acknowledgedFees": [
				{
					"type": "ONE_TIME_PREMIUM_DOMAIN_PURCHASE",
					"fee": {
						"value": 390000,
						"currencyCode": "USD"
					}
				}
			],
			"agreedBy": {
				"type": "string",
				"principal": "shopper_123",
				"actor": "agent:claude/atlas-1",
				"ip": "203.0.113.7"
			}
		},
		"price": {
			"currencyCode": "USD",
			"value": 0
		},
		"fees": [
			{
				"type": "string",
				"fee": {
					"currencyCode": "USD",
					"value": 0
				}
			}
		],
		"status": "string",
		"operationId": "00000000-0000-4000-8000-000000000000",
		"expiresAt": "string",
		"createdAt": "string",
		"updatedAt": "string",
		"links": [
			{
				"href": "https://api.godaddy.com/v3/domains/example",
				"rel": "string",
				"title": "string",
				"targetMediaType": "string",
				"targetSchema": "string",
				"method": "string",
				"submissionMediaType": "string",
				"submissionSchema": "string"
			}
		]
	},
	"registration.quote": {
		"quoteToken": "00000000-0000-4000-8000-000000000000",
		"expiresAt": "string",
		"domain": "example.com",
		"available": false,
		"price": {
			"currencyCode": "USD",
			"value": 0
		},
		"renewalPrice": {
			"currencyCode": "USD",
			"value": 0
		},
		"period": 1,
		"resolved": {
			"profileId": "00000000-0000-4000-8000-000000000000",
			"contactSource": "INLINE",
			"registrantSummary": "Jane Smith / jane@example.com",
			"autoRenew": false,
			"privacy": false,
			"nameServers": [
				"ns01.domaincontrol.com",
				"ns02.domaincontrol.com"
			]
		},
		"requiredAgreements": [
			{
				"agreementType": "string",
				"title": "Domain Name Registration Agreement",
				"url": "https://www.godaddy.com/agreements/showdoc?pageid=reg_sa"
			}
		],
		"irreversible": false,
		"inventory": "REGISTRY",
		"fees": [
			{
				"type": "string",
				"fee": {
					"currencyCode": "USD",
					"value": 0
				}
			}
		]
	},
	"registration.register": {
		"registrationId": "00000000-0000-4000-8000-000000000000",
		"domain": "example.com",
		"period": 1,
		"profileId": "00000000-0000-4000-8000-000000000000",
		"profile": {
			"contacts": {
				"registrant": {
					"firstName": "Jane",
					"lastName": "Smith",
					"organization": "Example LLC",
					"email": "user@example.com",
					"phone": {
						"countryCode": "string",
						"nationalNumber": "string",
						"extensionNumber": "string"
					},
					"address": {
						"line1": "string",
						"line2": "string",
						"city": "string",
						"state": "string",
						"countryCode": "string",
						"postalCode": "string"
					}
				},
				"admin": {
					"firstName": "Jane",
					"lastName": "Smith",
					"organization": "Example LLC",
					"email": "user@example.com",
					"phone": {
						"countryCode": "string",
						"nationalNumber": "string",
						"extensionNumber": "string"
					},
					"address": {
						"line1": "string",
						"line2": "string",
						"city": "string",
						"state": "string",
						"countryCode": "string",
						"postalCode": "string"
					}
				},
				"tech": {
					"firstName": "Jane",
					"lastName": "Smith",
					"organization": "Example LLC",
					"email": "user@example.com",
					"phone": {
						"countryCode": "string",
						"nationalNumber": "string",
						"extensionNumber": "string"
					},
					"address": {
						"line1": "string",
						"line2": "string",
						"city": "string",
						"state": "string",
						"countryCode": "string",
						"postalCode": "string"
					}
				},
				"billing": {
					"firstName": "Jane",
					"lastName": "Smith",
					"organization": "Example LLC",
					"email": "user@example.com",
					"phone": {
						"countryCode": "string",
						"nationalNumber": "string",
						"extensionNumber": "string"
					},
					"address": {
						"line1": "string",
						"line2": "string",
						"city": "string",
						"state": "string",
						"countryCode": "string",
						"postalCode": "string"
					}
				}
			},
			"autoRenew": false,
			"privacy": false,
			"nameServers": [
				"ns1.example.com",
				"ns2.example.com"
			]
		},
		"quoteToken": "00000000-0000-4000-8000-000000000000",
		"consent": {
			"agreementTypes": [
				"API_DPA"
			],
			"agreedAt": "string",
			"acknowledgedFees": [
				{
					"type": "ONE_TIME_PREMIUM_DOMAIN_PURCHASE",
					"fee": {
						"value": 390000,
						"currencyCode": "USD"
					}
				}
			],
			"agreedBy": {
				"type": "string",
				"principal": "shopper_123",
				"actor": "agent:claude/atlas-1",
				"ip": "203.0.113.7"
			}
		},
		"price": {
			"currencyCode": "USD",
			"value": 0
		},
		"fees": [
			{
				"type": "string",
				"fee": {
					"currencyCode": "USD",
					"value": 0
				}
			}
		],
		"status": "string",
		"operationId": "00000000-0000-4000-8000-000000000000",
		"expiresAt": "string",
		"createdAt": "string",
		"updatedAt": "string",
		"links": [
			{
				"href": "https://api.godaddy.com/v3/domains/example",
				"rel": "string",
				"title": "string",
				"targetMediaType": "string",
				"targetSchema": "string",
				"method": "string",
				"submissionMediaType": "string",
				"submissionSchema": "string"
			}
		]
	},
	"domain.get": {
		"domain": "example.com",
		"idnDomain": "例え.jp",
		"status": "ACTIVE",
		"expiresAt": "string",
		"createdAt": "string",
		"renewBy": "string",
		"updatedAt": "string",
		"autoRenew": false,
		"privacy": false,
		"transferLock": false,
		"nameServers": [
			"ns1.domaincontrol.com"
		],
		"links": [
			{
				"href": "https://api.godaddy.com/v3/domains/example",
				"rel": "string",
				"title": "string",
				"targetMediaType": "string",
				"targetSchema": "string",
				"method": "string",
				"submissionMediaType": "string",
				"submissionSchema": "string"
			}
		]
	},
	"domain.list": {
		"items": [
			{
				"domain": "example.com",
				"idnDomain": "例え.jp",
				"status": "ACTIVE",
				"expiresAt": "string",
				"createdAt": "string",
				"renewBy": "string",
				"updatedAt": "string",
				"autoRenew": false,
				"privacy": false,
				"transferLock": false,
				"nameServers": [
					"ns1.domaincontrol.com"
				],
				"links": [
					{
						"href": "https://api.godaddy.com/v3/domains/example",
						"rel": "string",
						"title": "string",
						"targetMediaType": "string",
						"targetSchema": "string",
						"method": "string",
						"submissionMediaType": "string",
						"submissionSchema": "string"
					}
				]
			}
		],
		"links": [
			{
				"href": "https://api.godaddy.com/v3/domains/example",
				"rel": "string",
				"title": "string",
				"targetMediaType": "string",
				"targetSchema": "string",
				"method": "string",
				"submissionMediaType": "string",
				"submissionSchema": "string"
			}
		]
	},
	"domain.updateNameservers": {
		"operationId": "00000000-0000-4000-8000-000000000000",
		"type": "string",
		"domain": "example.com",
		"status": "string",
		"result": {
			"expiresAt": "string",
			"orderId": "ord_abc123",
			"updatedAt": "string"
		},
		"error": {
			"name": "example",
			"correlationId": "string",
			"message": "string",
			"informationLink": "string",
			"details": [
				{
					"field": "string",
					"value": "string",
					"location": "string",
					"issue": "string",
					"description": "string"
				}
			],
			"links": [
				{
					"href": "https://api.godaddy.com/v3/domains/example",
					"rel": "string",
					"title": "string",
					"targetMediaType": "string",
					"targetSchema": "string",
					"method": "string",
					"submissionMediaType": "string",
					"submissionSchema": "string"
				}
			]
		},
		"links": [
			{
				"href": "https://api.godaddy.com/v3/domains/example",
				"rel": "string",
				"title": "string",
				"targetMediaType": "string",
				"targetSchema": "string",
				"method": "string",
				"submissionMediaType": "string",
				"submissionSchema": "string"
			}
		],
		"createdAt": "string",
		"updatedAt": "string"
	},
	"dnsRecord.create": {
		"recordId": "rec_a1b2c3d4",
		"name": "www",
		"type": "A",
		"data": "93.184.216.34",
		"ttl": 3600,
		"priority": 0,
		"service": "string",
		"port": 0,
		"weight": 0,
		"protocol": "string",
		"flag": 0,
		"tag": "string"
	},
	"dnsRecord.delete": {
		"success": true
	},
	"dnsRecord.list": {
		"items": [
			{
				"recordId": "rec_a1b2c3d4",
				"name": "www",
				"type": "A",
				"data": "93.184.216.34",
				"ttl": 3600,
				"priority": 0,
				"service": "string",
				"port": 0,
				"weight": 0,
				"protocol": "string",
				"flag": 0,
				"tag": "string"
			}
		],
		"totalItems": 0,
		"totalPages": 0,
		"links": [
			{
				"href": "https://api.godaddy.com/v3/domains/example",
				"rel": "string",
				"title": "string",
				"targetMediaType": "string",
				"targetSchema": "string",
				"method": "string",
				"submissionMediaType": "string",
				"submissionSchema": "string"
			}
		]
	},
	"dnsRecord.update": {
		"recordId": "rec_a1b2c3d4",
		"name": "www",
		"type": "A",
		"data": "93.184.216.34",
		"ttl": 3600,
		"priority": 0,
		"service": "string",
		"port": 0,
		"weight": 0,
		"protocol": "string",
		"flag": 0,
		"tag": "string"
	},
	"operation.get": {
		"operationId": "00000000-0000-4000-8000-000000000000",
		"type": "string",
		"domain": "example.com",
		"status": "string",
		"result": {
			"expiresAt": "string",
			"orderId": "ord_abc123",
			"updatedAt": "string"
		},
		"error": {
			"name": "example",
			"correlationId": "string",
			"message": "string",
			"informationLink": "string",
			"details": [
				{
					"field": "string",
					"value": "string",
					"location": "string",
					"issue": "string",
					"description": "string"
				}
			],
			"links": [
				{
					"href": "https://api.godaddy.com/v3/domains/example",
					"rel": "string",
					"title": "string",
					"targetMediaType": "string",
					"targetSchema": "string",
					"method": "string",
					"submissionMediaType": "string",
					"submissionSchema": "string"
				}
			]
		},
		"links": [
			{
				"href": "https://api.godaddy.com/v3/domains/example",
				"rel": "string",
				"title": "string",
				"targetMediaType": "string",
				"targetSchema": "string",
				"method": "string",
				"submissionMediaType": "string",
				"submissionSchema": "string"
			}
		],
		"createdAt": "string",
		"updatedAt": "string"
	}
};
