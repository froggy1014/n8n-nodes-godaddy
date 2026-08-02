# n8n-nodes-godaddy

[![CI](https://github.com/froggy1014/n8n-nodes-godaddy/actions/workflows/ci.yml/badge.svg)](https://github.com/froggy1014/n8n-nodes-godaddy/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/n8n-nodes-godaddy?logo=npm)](https://www.npmjs.com/package/n8n-nodes-godaddy)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-godaddy?logo=npm)](https://www.npmjs.com/package/n8n-nodes-godaddy)
[![n8n community node](https://img.shields.io/badge/n8n-community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/)
[![GoDaddy API](https://img.shields.io/badge/GoDaddy%20Domains-v3.1.0-1BDBDB?logo=godaddy)](https://developer.godaddy.com/docs/api-users)
[![Spec-generated](https://img.shields.io/badge/OpenAPI-spec--generated-6E56CF)](#-architecture)
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A520.15-green?logo=node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5%2B-blue?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/github/license/froggy1014/n8n-nodes-godaddy)](LICENSE)

Unofficial n8n community node for the **[GoDaddy Domains v3 API](https://developer.godaddy.com/docs/api-users)** — search,
quote, register, and manage domains and DNS records straight from your workflows.

Every operation is **generated from GoDaddy's official OpenAPI spec** and re-synced weekly by CI, so the node never
drifts from the API.

> ⚠️ Not affiliated with, endorsed by, or sponsored by GoDaddy Inc.

---

## ✨ Features

| Category         | What you get                                                                    |
| ---------------- | ------------------------------------------------------------------------------- |
| **Discovery**    | Availability checks and name suggestions with price/term data                    |
| **Registration** | Quote → register → poll, the full purchase flow including consent payloads       |
| **Domains**      | Read registered domains, replace nameservers                                     |
| **DNS**          | List, create, delete — A, AAAA, ALIAS, CAA, CNAME, MX, NS, SOA, SRV, TXT          |
| **Operations**   | Poll long-running async domain operations                                        |
| **Mock Data**    | Spec-derived sample responses with **no credential** — build workflows offline   |
| **Environments** | Production and OTE sandbox toggle on the credential, so test buys cost nothing   |
| **AI-ready**     | `usableAsTool: true` — attach it directly to an AI Agent as a tool               |

---

## 📦 Installation

### n8n Community Nodes (recommended)

1. Open **Settings → Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-godaddy`
4. Click **Install**

### npm (self-hosted)

```bash
npm install n8n-nodes-godaddy
```

---

## 🔑 Credentials

1. Generate a **Personal Access Token** in the [GoDaddy developer dashboard](https://developer.godaddy.com/docs/api-users/auth/how-to)
2. In n8n: **Credentials → New → GoDaddy API**

| Field                     | Description                                                                 |
| ------------------------- | --------------------------------------------------------------------------- |
| **Environment**           | `Production` (`api.godaddy.com`) or `OTE Test` (`api.ote-godaddy.com`)       |
| **Personal Access Token** | PAT from the developer dashboard                                             |

Auth is sent as `Authorization: Bearer <PAT>`. The credential ships a test request, so **Test** verifies the token
before you save it.

> 💸 **Registration charges real money.** Point the credential at **OTE** and rehearse the whole quote → register flow
> there before switching to Production.

---

## 📚 Operations

| Resource         | Operation              | Endpoint                                    |
| ---------------- | ---------------------- | ------------------------------------------- |
| **Discovery**    | Check Availability     | `GET /check-availability`                   |
| **Discovery**    | Suggest                | `GET /suggestions`                          |
| **Registration** | Quote                  | `POST /registration-quotes`                 |
| **Registration** | Register               | `POST /registrations`                       |
| **Registration** | Get                    | `GET /registrations/{registrationId}`       |
| **Domain**       | Get                    | `GET /domain-names/{domain-name}`           |
| **Domain**       | Update Nameservers     | `PUT /domain-names/{domain-name}/nameservers` |
| **DNS Record**   | List                   | `GET /zones/{zone}/dns-records`             |
| **DNS Record**   | Create                 | `POST /zones/{zone}/dns-records`            |
| **DNS Record**   | Delete                 | `DELETE /zones/{zone}/dns-records/{recordId}` |
| **Operation**    | Get                    | `GET /operations/{operationId}`             |

Which operations are exposed is hand-curated in [`scripts/allowlist.json`](scripts/allowlist.json) — the parameters,
types, and options behind each are generated from the spec.

---

## 🚀 Quick Start

### Example: check a domain, then create an A record

```json
{
	"nodes": [
		{
			"parameters": {
				"resource": "discovery",
				"operation": "checkAvailability",
				"domain": "sunrisebakery.com"
			},
			"type": "n8n-nodes-godaddy.goDaddy",
			"typeVersion": 1,
			"position": [0, 0],
			"name": "Check Availability",
			"credentials": { "goDaddyApi": { "id": "1", "name": "GoDaddy account" } }
		},
		{
			"parameters": {
				"resource": "dnsRecord",
				"operation": "create",
				"zone": "sunrisebakery.com",
				"name": "www",
				"type": "A",
				"data": "203.0.113.10",
				"ttl": 3600
			},
			"type": "n8n-nodes-godaddy.goDaddy",
			"typeVersion": 1,
			"position": [220, 0],
			"name": "Create A Record",
			"credentials": { "goDaddyApi": { "id": "1", "name": "GoDaddy account" } }
		}
	],
	"connections": {
		"Check Availability": { "main": [[{ "node": "Create A Record", "type": "main", "index": 0 }]] }
	}
}
```

### Registration flow

Registration is a three-step, asynchronous purchase — don't try to shortcut it:

```
Quote  ──►  Register  ──►  Operation: Get
(POST /registration-quotes)   (needs quoteToken + consent)   (poll until status is done)
```

1. **Quote** returns a `quoteToken` plus the exact price and the consent text the buyer must agree to.
2. **Register** takes that `quoteToken` and a **Consent** object (agreement keys, timestamp, buyer IP).
3. **Register** responds with an operation — poll **Operation → Get** until it settles.

---

## 🧪 Mock Data mode

Every operation has a **Mock Data** toggle. Turn it on and the node returns a deterministic sample response built from
the spec's own schemas — **no credential, no network call, no charges**.

Use it to wire up branches, expressions, and downstream nodes before you have an account, then flip it off.

---

## 🏗 Architecture

Nothing operation-specific is written by hand. The OpenAPI document is the source of truth:

```
scripts/spec/domains-v3.json     # pinned spec, fetched from developer.godaddy.com
scripts/allowlist.json           # which operations get exposed  (hand-curated)
scripts/generate.mjs             # spec + allowlist → descriptions / registry / mocks

nodes/GoDaddy/descriptions/      # GENERATED  n8n UI property definitions
nodes/GoDaddy/registry.ts        # GENERATED  operation → method / path / param mapping
nodes/GoDaddy/mocks.ts           # GENERATED  deterministic sample responses
nodes/GoDaddy/request.ts         #            registry-driven request builder
nodes/GoDaddy/GoDaddy.node.ts    #            one generic executor for every operation
```

**Never hand-edit the generated files** — CI fails if they drift from the spec.

---

## 🔄 Staying in sync with the spec

GoDaddy publishes no release feed or changelog for this API; the JSON at
`https://developer.godaddy.com/openapi/domains-v3.json` *is* the changelog.

The **Update GoDaddy spec** workflow re-fetches it **every Monday**. If the stored copy differs at all — version bump or
silent content edit — it regenerates the node, bumps the package version, and opens a PR with the diff.

Manually:

```bash
npm run fetch-spec   # re-download the spec and pin its version
npm run generate     # regenerate descriptions / registry / mocks
npm run build && npm run lint
```

---

## 🛠 Development

```bash
npm install --ignore-scripts   # skips the isolated-vm native build; not needed for tsc/eslint
npm run build                  # generate → tsc → copy icons + codex
npm run dev                    # tsc watch mode
npm run lint                   # eslint-plugin-n8n-nodes-base
npm run format                 # prettier
```

---

## 📋 Requirements

- **n8n** with community nodes enabled
- **Node.js** ≥ 20.15
- **GoDaddy account** with a Personal Access Token

---

## 🤝 Contributing

PRs welcome. Two rules:

1. Adding an operation means editing [`scripts/allowlist.json`](scripts/allowlist.json) and re-running `npm run generate` — not editing `descriptions/`.
2. Run `npm run build && npm run lint` before you push; CI runs the same thing.

🐛 Found a bug? [Open an issue](https://github.com/froggy1014/n8n-nodes-godaddy/issues/new)

---

## 📄 License

[MIT](LICENSE)

## 👤 Author

**froggy1014** — [github.com/froggy1014](https://github.com/froggy1014)

## 🔗 Links

- [npm package](https://www.npmjs.com/package/n8n-nodes-godaddy)
- [GitHub repository](https://github.com/froggy1014/n8n-nodes-godaddy)
- [GoDaddy Domains API docs](https://developer.godaddy.com/docs/api-users)
- [n8n community nodes](https://docs.n8n.io/integrations/community-nodes/)
