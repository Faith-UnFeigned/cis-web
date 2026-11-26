#!/usr/bin/env node
/**
 * Compares the bundled fallback hymnal list (src/data/hymnals.json) with the
 * upstream cis-hymnals repository.
 *
 *   node scripts/sync-hymnals.mjs           # report differences, exit 1 if any
 *   node scripts/sync-hymnals.mjs --write   # rewrite src/data/hymnals.json from upstream
 *
 * The app already discovers new hymnals at runtime; this keeps the offline
 * fallback list current and flags broken paths early.
 *
 * Set GITHUB_TOKEN to avoid the unauthenticated GitHub API rate limit.
 * When REPORT_FILE is set, the Markdown report is also written there.
 */
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const REPO = "TinasheMzondiwa/cis-hymnals";
const BRANCH = "main";
const FALLBACK_PATH = fileURLToPath(new URL("../src/data/hymnals.json", import.meta.url));

async function getJson(url, headers = {}) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GET ${url} failed: HTTP ${response.status}`);
  }
  return response.json();
}

async function fetchUpstream() {
  const headers = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const [config, tree] = await Promise.all([
    getJson(`https://raw.githubusercontent.com/${REPO}/${BRANCH}/v2/config.json`),
    getJson(`https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`, headers),
  ]);
  const paths = tree.tree.map((entry) => entry.path);
  return { config, paths };
}

/** Mirrors resolveHymnals() in src/data/hymnalsConfig.tsx. */
function resolveHymnals(config, paths) {
  const files = new Map();
  for (const path of paths) {
    const match = /^v2\/(.+\/([^/]+))\.json$/.exec(path);
    if (match) files.set(match[2].toLowerCase(), match[1]);
  }

  const hymnals = [];
  const missingFiles = [];
  for (const entry of config) {
    const fileName = files.get(entry.key.toLowerCase());
    if (!fileName) {
      missingFiles.push(entry.key);
      continue;
    }
    hymnals.push({
      key: entry.key,
      title: entry.title,
      language: entry.language,
      fileName,
      ...(entry.refrain_label ? { refrainLabel: entry.refrain_label } : {}),
    });
  }
  return { hymnals, missingFiles };
}

function compare(local, upstream) {
  const localByKey = new Map(local.map((h) => [h.key, h]));
  const upstreamByKey = new Map(upstream.map((h) => [h.key, h]));
  const added = upstream.filter((h) => !localByKey.has(h.key));
  const removed = local.filter((h) => !upstreamByKey.has(h.key));
  const changed = [];
  for (const h of upstream) {
    const old = localByKey.get(h.key);
    if (!old) continue;
    for (const field of ["title", "language", "fileName", "refrainLabel"]) {
      if ((old[field] ?? "") !== (h[field] ?? "")) {
        changed.push({ key: h.key, field, from: old[field], to: h[field] });
      }
    }
  }
  return { added, removed, changed };
}

function formatReport({ added, removed, changed }, missingFiles) {
  const lines = ["## Hymnal list out of sync with upstream", ""];
  if (added.length) {
    lines.push("**New upstream hymnals** (the app picks these up at runtime, but the fallback list lacks them):", "");
    for (const h of added) lines.push(`- \`${h.key}\` — ${h.title} (${h.language}) → \`v2/${h.fileName}.json\``);
    lines.push("");
  }
  if (removed.length) {
    lines.push("**In the fallback list but missing from upstream `v2/config.json`** (removed or renamed):", "");
    for (const h of removed) lines.push(`- \`${h.key}\` — \`v2/${h.fileName}.json\``);
    lines.push("");
  }
  if (changed.length) {
    lines.push("**Changed fields:**", "");
    for (const c of changed) lines.push(`- \`${c.key}\` ${c.field}: \`${c.from ?? ""}\` → \`${c.to ?? ""}\``);
    lines.push("");
  }
  if (missingFiles.length) {
    lines.push(
      "**Listed in upstream `v2/config.json` without a matching `v2/**/<key>.json` file** (skipped by the app):",
      "",
    );
    for (const key of missingFiles) lines.push(`- \`${key}\``);
    lines.push("");
  }
  lines.push("Run `npm run sync:hymnals` and commit `src/data/hymnals.json` to update the fallback list.");
  return lines.join("\n");
}

const { config, paths } = await fetchUpstream();
const { hymnals: upstream, missingFiles } = resolveHymnals(config, paths);

if (process.argv.includes("--write")) {
  writeFileSync(FALLBACK_PATH, `${JSON.stringify(upstream, null, 2)}\n`);
  console.log(`Wrote ${upstream.length} hymnals to ${FALLBACK_PATH}`);
  if (missingFiles.length) console.warn(`Skipped (no file upstream): ${missingFiles.join(", ")}`);
  process.exit(0);
}

const local = JSON.parse(readFileSync(FALLBACK_PATH, "utf8"));
const diff = compare(local, upstream);
const outOfSync = diff.added.length || diff.removed.length || diff.changed.length || missingFiles.length;

if (!outOfSync) {
  console.log(`Fallback hymnal list matches upstream (${upstream.length} hymnals).`);
  process.exit(0);
}

const report = formatReport(diff, missingFiles);
console.log(report);
if (process.env.REPORT_FILE) writeFileSync(process.env.REPORT_FILE, `${report}\n`);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${report}\n`);
process.exit(1);
