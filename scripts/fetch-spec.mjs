#!/usr/bin/env node
/**
 * Downloads the GoDaddy Domains v3 OpenAPI spec and pins its version.
 *
 * GoDaddy publishes no release feed for the spec — the JSON document itself is
 * the source of truth. The update workflow re-fetches it and diffs the stored
 * copy to detect changes (info.version may or may not be bumped).
 *
 * Usage:
 *   node scripts/fetch-spec.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const url = 'https://developer.godaddy.com/openapi/domains-v3.json';

console.log(`Fetching GoDaddy Domains v3 spec ...`);
const res = await fetch(url);
if (!res.ok) {
	console.error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
	process.exit(1);
}
const spec = JSON.parse(await res.text());
const version = spec.info?.version;
if (!version) {
	console.error('Spec has no info.version — refusing to write.');
	process.exit(1);
}

writeFileSync(join(here, 'spec', 'domains-v3.json'), JSON.stringify(spec, null, 1) + '\n');
writeFileSync(join(here, 'spec', 'godaddy-version.json'), JSON.stringify({ version }, null, '\t') + '\n');
console.log(`Wrote scripts/spec/domains-v3.json (${Object.keys(spec.paths).length} paths), version ${version}`);
