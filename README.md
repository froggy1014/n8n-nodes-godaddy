# n8n-nodes-godaddy

Unofficial [n8n](https://n8n.io) community node for the [GoDaddy Domains v3 API](https://developer.godaddy.com/docs/api-users).
Search, quote, register, and manage domains and DNS records from n8n workflows.

> Not affiliated with GoDaddy Inc. Generated from the official OpenAPI spec and kept in sync automatically.

## Install

In n8n: **Settings → Community Nodes → Install** → `n8n-nodes-godaddy`

## Credentials

| Field | Description |
|---|---|
| Environment | `Production` (api.godaddy.com) or `OTE Test` (api.ote-godaddy.com) |
| Personal Access Token | PAT from the [developer dashboard](https://developer.godaddy.com/docs/api-users/auth/how-to) |

Auth is `Authorization: Bearer <PAT>`. For any write that charges money (registration), test on **OTE** first.

The node also has a **Mock Data** toggle that returns sample responses generated from the spec — no credential needed, useful while sketching workflows.

## Operations

| Resource | Operation | Endpoint |
|---|---|---|
| Discovery | Check Availability | `GET /check-availability` |
| Discovery | Suggest | `GET /suggestions` |
| Registration | Quote | `POST /registration-quotes` |
| Registration | Register | `POST /registrations` |
| Registration | Get | `GET /registrations/{registrationId}` |
| Domain | Get | `GET /domain-names/{domain-name}` |
| Domain | Update Nameservers | `PUT /domain-names/{domain-name}/nameservers` |
| DNS Record | List | `GET /zones/{zone}/dns-records` |
| DNS Record | Create | `POST /zones/{zone}/dns-records` |
| DNS Record | Delete | `DELETE /zones/{zone}/dns-records/{recordId}` |
| Operation | Get | `GET /operations/{operationId}` |

Registration flow: **Quote → Register (with `quoteToken` + consent) → poll Operation**.

## Architecture

Everything operation-specific is **generated** from the official OpenAPI 3.1 spec:

```
scripts/spec/domains-v3.json     # pinned spec (fetched from developer.godaddy.com)
scripts/allowlist.json           # which operations are exposed, hand-curated
scripts/generate.mjs             # spec + allowlist → descriptions/, registry.ts, mocks.ts
nodes/GoDaddy/descriptions/      # GENERATED n8n UI property definitions
nodes/GoDaddy/registry.ts        # GENERATED operation → method/path/param mapping
nodes/GoDaddy/mocks.ts           # GENERATED deterministic sample responses
nodes/GoDaddy/request.ts         # generic registry-driven request builder
nodes/GoDaddy/GoDaddy.node.ts    # single generic executor
```

Never hand-edit generated files; CI fails if they drift from the spec.

## Updating to a new spec

GoDaddy publishes no release feed or changelog for the spec — the JSON document at
`https://developer.godaddy.com/openapi/domains-v3.json` is the source of truth.
The `update-spec` GitHub Actions workflow re-fetches it **every Monday**, and if the
stored copy differs (version bump or silent content change) it regenerates the node,
bumps the package version, and opens a PR with the diff.

Manually:

```bash
npm run fetch-spec   # re-download the spec and pin its version
npm run generate     # regenerate descriptions/registry/mocks
npm run build && npm run lint
```

## Development

```bash
npm install --ignore-scripts
npm run build
npm run lint
```

## License

MIT
