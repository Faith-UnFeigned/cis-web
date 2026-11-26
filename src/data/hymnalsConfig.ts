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

/**
 * Builds the hymnal list from upstream `v2/config.json` and the repository's
 * file list. Upstream's config has no file paths, but each hymnal lives at
 * `v2/<folder>/<key>.json`, so the path is found by matching the file name.
 * Entries without a matching file are skipped.
 *
 * Mirrored in scripts/sync-hymnals.mjs.
 */
export function resolveHymnals(config: UpstreamHymnal[], paths: string[]): HymnalConfig[] {
  const files = new Map<string, string>();
  for (const path of paths) {
    const match = /^v2\/(.+\/([^/]+))\.json$/.exec(path);
    if (match) files.set(match[2].toLowerCase(), match[1]);
  }

  return config.flatMap((entry) => {
    const fileName = files.get(entry.key.toLowerCase());
    if (!fileName) return [];
    return [
      {
        key: entry.key,
        title: entry.title,
        language: entry.language,
        fileName,
        ...(entry.refrain_label ? { refrainLabel: entry.refrain_label } : {}),
      },
    ];
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
  try {
    const tree = await getJson<{ tree: { path: string }[] }>(
      `https://api.github.com/repos/${UPSTREAM_REPO}/git/trees/${UPSTREAM_BRANCH}?recursive=1`,
      { signal },
    );
    return tree.tree.map((entry) => entry.path);
  } catch (error) {
    if (signal?.aborted) throw error;
    // The GitHub API is rate limited for anonymous use; jsDelivr is a
    // fallback (it may lag behind for a while, but has no such limit).
    const listing = await getJson<{ files: { name: string }[] }>(
      `https://data.jsdelivr.com/v1/packages/gh/${UPSTREAM_REPO}@${UPSTREAM_BRANCH}?structure=flat`,
      { signal },
    );
    return listing.files.map((file) => file.name.replace(/^\//, ""));
  }
}

/** Fetches the live hymnal list from the upstream repository. */
export async function fetchUpstreamHymnals(signal?: AbortSignal): Promise<HymnalConfig[]> {
  const [config, paths] = await Promise.all([
    getJson<UpstreamHymnal[]>(`${UPSTREAM_RAW_URL}/config.json`, {
      cache: "no-cache",
      signal,
    }),
    fetchUpstreamPaths(signal),
  ]);
  const hymnals = resolveHymnals(config, paths);
  if (hymnals.length === 0) {
    throw new Error("Upstream hymnal list is empty");
  }
  return hymnals;
}
