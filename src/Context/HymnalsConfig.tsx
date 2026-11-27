import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  FALLBACK_HYMNALS,
  fetchUpstreamHymnals,
  HymnalConfig,
  isHymnalConfig,
  normalizeHymnalKey,
} from "../data/hymnalsConfig";

// Bump the version when the cached shape changes.
const CACHE_STORAGE_KEY = "hymnalsConfigCache:v1";
const CACHE_MAX_AGE_MS = 60 * 60 * 1000;

/**
 * - `cached`: showing a recent cached list, no network request made yet
 * - `loading`: fetching the live list
 * - `ready`: showing the live list
 * - `failed`: the live list couldn't be fetched; showing the cached or bundled list
 */
type HymnalsStatus = "cached" | "loading" | "ready" | "failed";

type HymnalsConfigContextValue = {
  hymnals: HymnalConfig[];
  status: HymnalsStatus;
  findHymnal: (key: string | undefined) => HymnalConfig | undefined;
  /** Fetch the live list now, ignoring the cache. */
  refresh: () => void;
};

type CachedHymnals = { fetchedAt: number; hymnals: HymnalConfig[] };

function readCache(): CachedHymnals | null {
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as Partial<CachedHymnals> | null;
    if (
      typeof cached?.fetchedAt !== "number" ||
      !Array.isArray(cached.hymnals) ||
      cached.hymnals.length === 0 ||
      !cached.hymnals.every(isHymnalConfig)
    ) {
      return null;
    }
    return { fetchedAt: cached.fetchedAt, hymnals: cached.hymnals };
  } catch {
    return null;
  }
}

function writeCache(hymnals: HymnalConfig[]) {
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify({ fetchedAt: Date.now(), hymnals }));
  } catch {
    // Storage may be unavailable (private mode, quota); the cache is optional.
  }
}

const HymnalsConfigContext = createContext<HymnalsConfigContextValue | null>(null);

/**
 * Provides the list of hymnals. Starts with the cached (or bundled) list and
 * fetches the live list from upstream, so hymnals added upstream appear
 * without a new deploy.
 */
export function HymnalsConfigProvider({ children }: { children: ReactNode }) {
  const [initialCache] = useState(readCache);
  const [hymnals, setHymnals] = useState<HymnalConfig[]>(initialCache?.hymnals ?? FALLBACK_HYMNALS);
  const [isCacheFresh] = useState(
    () => initialCache !== null && Date.now() - initialCache.fetchedAt < CACHE_MAX_AGE_MS,
  );
  const [status, setStatus] = useState<HymnalsStatus>(isCacheFresh ? "cached" : "loading");
  const controllerRef = useRef<AbortController | null>(null);
  // When the live list was last fetched (or attempted), to refresh it in long-open tabs.
  const lastFetchRef = useRef(initialCache?.fetchedAt ?? 0);

  const load = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    lastFetchRef.current = Date.now();
    setStatus("loading");

    try {
      const upstream = await fetchUpstreamHymnals(controller.signal);
      if (controller.signal.aborted) return;
      setHymnals(upstream);
      writeCache(upstream);
      setStatus("ready");
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error("Could not fetch the hymnal list, using the saved one:", error);
      setStatus("failed");
    }
  }, []);

  useEffect(() => {
    if (!isCacheFresh) load();

    // Tabs can stay open for days; refresh a stale list when the tab is shown.
    const refreshIfStale = () => {
      if (document.visibilityState === "visible" && Date.now() - lastFetchRef.current >= CACHE_MAX_AGE_MS) {
        load();
      }
    };
    document.addEventListener("visibilitychange", refreshIfStale);

    return () => {
      document.removeEventListener("visibilitychange", refreshIfStale);
      controllerRef.current?.abort();
    };
  }, [isCacheFresh, load]);

  const findHymnal = useCallback(
    (key: string | undefined) => {
      if (!key) return undefined;
      const normalizedKey = normalizeHymnalKey(key);
      return hymnals.find((hymnal) => hymnal.key.toLowerCase() === normalizedKey);
    },
    [hymnals],
  );

  const value = useMemo(() => ({ hymnals, status, findHymnal, refresh: load }), [hymnals, status, findHymnal, load]);

  return <HymnalsConfigContext.Provider value={value}>{children}</HymnalsConfigContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHymnalsConfig() {
  const context = useContext(HymnalsConfigContext);
  if (!context) {
    throw new Error("useHymnalsConfig must be used within a HymnalsConfigProvider");
  }
  return context;
}
