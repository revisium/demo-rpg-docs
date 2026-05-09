#!/usr/bin/env node
/**
 * Apply bootstrap schemas + seed to a Revisium project.
 *
 * Usage:
 *   node apply.mjs --org <organization> --project <project> [--source <dir>] [--host <host>]
 *
 * Example:
 *   node apply.mjs --org my-org --project demo-rpg-data
 *   node apply.mjs --org my-org --project demo-rpg-cms --source ../cms
 *
 * Reads:
 *   <source>/order.json           — table creation order (FK-aware)
 *   <source>/schemas/<table>.json — JSON Schema body per table
 *   <source>/seed/<table>.json    — seed rows per table: [{ rowId, data }, …]
 *
 * Authentication: set REVISIUM_TOKEN env var (Bearer token from cloud.revisium.io
 * or your self-hosted instance). The script does NOT commit; review the draft
 * revision in the admin UI and commit there, or extend this script to call
 * create_revision after a successful apply.
 *
 * Dependencies: only built-in fetch; no npm install required (Node 18+).
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = { source: resolve(__dirname, '..', 'data'), host: 'https://cloud.revisium.io' };
  const takeValue = (k, i) => {
    const v = argv[i + 1];
    if (v === undefined || v.startsWith('--')) {
      console.error(`Missing value for ${k}`);
      process.exit(2);
    }
    return v;
  };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--org') { args.org = takeValue(k, i); i++; }
    else if (k === '--project') { args.project = takeValue(k, i); i++; }
    else if (k === '--source') { args.source = resolve(process.cwd(), takeValue(k, i)); i++; }
    else if (k === '--host') { args.host = takeValue(k, i); i++; }
    else if (k === '--branch') { args.branch = takeValue(k, i); i++; }
    else { console.error(`Unknown flag: ${k}`); process.exit(2); }
  }
  if (!args.org || !args.project) {
    console.error('Usage: node apply.mjs --org <org> --project <project> [--source <dir>] [--host <host>]');
    process.exit(2);
  }
  args.branch ??= 'master';
  args.token = process.env.REVISIUM_TOKEN;
  if (!args.token) {
    console.error('REVISIUM_TOKEN env var required.');
    process.exit(2);
  }
  return args;
}

async function api(args, path, init = {}) {
  const url = `${args.host.replace(/\/$/, '')}/api${path}`;
  const controller = new AbortController();
  const rawTimeout = process.env.REVISIUM_HTTP_TIMEOUT_MS;
  const parsedTimeout = rawTimeout !== undefined ? Number(rawTimeout) : NaN;
  const timeoutMs = Number.isFinite(parsedTimeout) && parsedTimeout > 0 ? parsedTimeout : 30000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res;
  try {
    res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${args.token}`,
        ...(init.headers ?? {}),
      },
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`${init.method ?? 'GET'} ${path} timed out after ${timeoutMs}ms (set REVISIUM_HTTP_TIMEOUT_MS to override)`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${init.method ?? 'GET'} ${path} -> ${res.status}: ${body}`);
  }
  return res.headers.get('content-type')?.includes('json') ? res.json() : res.text();
}

async function loadJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function ensureProject(args) {
  // Best-effort: try to create the project; if it already exists, the API
  // returns 409 and we ignore it. Replace this with a get-then-create if
  // your Revisium build returns a different error code.
  try {
    await api(args, `/organizations/${args.org}/projects`, {
      method: 'POST',
      body: JSON.stringify({ projectName: args.project, branchName: args.branch }),
    });
    console.log(`[ok]    project created: ${args.org}/${args.project}`);
  } catch (err) {
    if (!String(err.message).includes('409')) throw err;
    console.log(`[skip]  project exists:  ${args.org}/${args.project}`);
  }
}

async function applyTable(args, tableId, schema, rows) {
  await api(args, `/${args.org}/${args.project}/${args.branch}/draft/tables`, {
    method: 'POST',
    body: JSON.stringify({ tableId, schema, rows }),
  });
  console.log(`[ok]    ${tableId} (${rows.length} rows)`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const order = await loadJson(join(args.source, 'order.json'));

  console.log(`apply: ${args.host} :: ${args.org}/${args.project}/${args.branch}`);
  console.log(`source: ${args.source}`);
  console.log(`tables: ${order.length}`);
  console.log('');

  await ensureProject(args);

  for (const tableId of order) {
    const schema = await loadJson(join(args.source, 'schemas', `${tableId}.json`));
    const rows = await loadJson(join(args.source, 'seed', `${tableId}.json`));
    await applyTable(args, tableId, schema, rows);
  }

  console.log('');
  console.log('done. Review the draft revision in the admin UI and commit when ready.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
