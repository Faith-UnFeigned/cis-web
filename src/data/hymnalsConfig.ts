import fallbackHymnals from "./hymnals.json";

export type HymnalConfig = {
  language: string;
  title: string;
  key: string;
  fileName: string;
  refrainLabel?: string;
};

export const PREFERRED_HYMNAL_STORAGE_KEY = "preferredHymnal";

const UPSTREAM_REPO = "TinasheMzondiwa/cis-hymnals";
const UPSTREAM_BRANCH = "main";
const UPSTREAM_RAW_URL = `https://raw.githubusercontent.com/${UPSTREAM_REPO}/${UPSTREAM_BRANCH}/v2`;

export const getHymnalFileUrl = (fileName: string) => {
  return `${UPSTREAM_RAW_URL}/${fileName}.json`;
};

/**
 * Bundled copy of the upstream hymnal list, used until (or if) the live list
 * can't be fetched. Regenerate it with `npm run sync:hymnals`; a scheduled
 * workflow opens an issue when it drifts from upstream.
 */
export const FALLBACK_HYMNALS: HymnalConfig[] = fallbackHymnals;

/** Keys that were renamed, so saved preferences and old links keep working. */
const HYMNAL_KEY_ALIASES: Record<string, string> = {
  kikuyu: "gikuyu",
};

export const normalizeHymnalKey = (key: string) => {
  const lowerKey = key.toLowerCase();
  return HYMNAL_KEY_ALIASES[lowerKey] ?? lowerKey;
};

type UpstreamHymnal = {
  key: string;
  title: string;
  language: string;
  refrain_label?: string;
};

const isUpstreamHymnal = (value: unknown): value is UpstreamHymnal => {
  const entry = value as Partial<UpstreamHymnal> | null;
  return (
    typeof entry?.key === "string" &&
    entry.key !== "" &&
    typeof entry.title === "string" &&
    typeof entry.language === "string" &&
    (entry.refrain_label === undefined || typeof entry.refrain_label === "string")
  );
};

/** Guards data read from storage, which may come from an older app version. */
export const isHymnalConfig = (value: unknown): value is HymnalConfig => {
  const entry = value as Partial<HymnalConfig> | null;
  return (
    typeof entry?.key === "string" &&
    typeof entry.title === "string" &&
    typeof entry.language === "string" &&
    typeof entry.fileName === "string" &&
    (entry.refrainLabel === undefined || typeof entry.refrainLabel === "string")
  );
};

/**
 * Maps each hymnal file's name to its path under `v2/`, without the
 * extension, e.g. `gikuyu` → `kikuyu/gikuyu`.
 */
export function mapHymnalFiles(paths: string[]): Map<string, string> {
  const files = new Map<string, string>();
  for (const path of paths) {
    const match = /^v2\/(.+\/([^/]+))\.json$/.exec(path);
    if (match) files.set(match[2].toLowerCase(), match[1]);
  }
  return files;
}

const toHymnalConfig = (entry: UpstreamHymnal, fileName: string): HymnalConfig => ({
  key: entry.key,
  title: entry.title,
  language: entry.language,
  fileName,
  ...(entry.refrain_label ? { refrainLabel: entry.refrain_label } : {}),
});

/**
 * Builds the hymnal list from upstream `v2/config.json` and the repository's
 * files. Upstream's config has no file paths, but each hymnal lives at
 * `v2/<folder>/<key>.json`, so the path is found by matching the file name.
 * Entries without a matching file are skipped.
 *
 * Mirrored in scripts/sync-hymnals.mjs.
 */
export function resolveHymnals(config: UpstreamHymnal[], files: Map<string, string>): HymnalConfig[] {
  return config.flatMap((entry) => {
    const fileName = files.get(entry.key.toLowerCase());
    return fileName ? [toHymnalConfig(entry, fileName)] : [];
  });
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

/** Lists the repository's file paths, e.g. `v2/english/english.json`. */
async function fetchUpstreamPaths(signal?: AbortSignal): Promise<string[]> {
  const tree = await getJson<{ tree: { path: string }[] }>(
    `https://api.github.com/repos/${UPSTREAM_REPO}/git/trees/${UPSTREAM_BRANCH}?recursive=1`,
    { signal },
  );
  return tree.tree.map((entry) => entry.path);
}

async function hymnalFileExists(fileName: string, signal?: AbortSignal) {
  try {
    const response = await fetch(getHymnalFileUrl(fileName), { method: "HEAD", cache: "no-cache", signal });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Fetches the live hymnal list from the upstream repository.
 *
 * File paths come from the GitHub API, which allows 60 anonymous requests per
 * hour per IP address. When it can't be used, known paths come from the
 * bundled list, and a new hymnal is assumed to follow the usual
 * `v2/<key>/<key>.json` layout, checked with a HEAD request.
 */
export async function fetchUpstreamHymnals(signal?: AbortSignal): Promise<HymnalConfig[]> {
  const [rawConfig, paths] = await Promise.all([
    getJson<unknown>(`${UPSTREAM_RAW_URL}/config.json`, { cache: "no-cache", signal }),
    fetchUpstreamPaths(signal).catch((error) => {
      if (signal?.aborted) throw error;
      console.warn("Could not list upstream hymnal files, using known paths:", error);
      return null;
    }),
  ]);

  if (!Array.isArray(rawConfig)) {
    throw new Error("Upstream hymnal config is not a list");
  }
  const config = rawConfig.filter(isUpstreamHymnal);

  let hymnals: HymnalConfig[];
  if (paths) {
    hymnals = resolveHymnals(config, mapHymnalFiles(paths));
  } else {
    const knownFiles = new Map(FALLBACK_HYMNALS.map((hymnal) => [hymnal.key.toLowerCase(), hymnal.fileName]));
    const resolved = await Promise.all(
      config.map(async (entry) => {
        const knownFileName = knownFiles.get(entry.key.toLowerCase());
        if (knownFileName) return toHymnalConfig(entry, knownFileName);
        const guessedFileName = `${entry.key}/${entry.key}`;
        return (await hymnalFileExists(guessedFileName, signal)) ? toHymnalConfig(entry, guessedFileName) : null;
      }),
    );
    hymnals = resolved.filter((hymnal): hymnal is HymnalConfig => hymnal !== null);
  }

  if (hymnals.length === 0) {
    throw new Error("Upstream hymnal list is empty");
  }
  return hymnals;
}
