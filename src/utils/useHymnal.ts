import { useCallback, useEffect, useRef, useState } from "react";
import { getHymnalFileUrl, HymnalConfig } from "../data/hymnalsConfig";
import { Hymn } from "./types";

export type HymnMap = Record<number, Hymn>;

const HYMNAL_REFRESH_INTERVAL_MS = 10 * 60 * 1000;

const toHymnMap = (hymns: Hymn[]): HymnMap =>
  hymns.reduce<HymnMap>((accumulator, current) => {
    accumulator[current.number] = current;
    return accumulator;
  }, {});

/**
 * Loads the hymns of the given hymnal and keeps them fresh.
 *
 * The data is revalidated with the server on every request (instead of
 * trusting the browser HTTP cache), and refetched silently when the tab
 * becomes visible again and periodically while it stays visible, so hymns
 * added upstream show up without a manual reload.
 *
 * A failed background refresh keeps the hymns already loaded; `error` is
 * only set when the initial load (or a manual `reload`) fails.
 */
export function useHymnal(hymnalConfig: HymnalConfig | undefined) {
  const [hymns, setHymns] = useState<HymnMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const loadRef = useRef<((background: boolean) => void) | null>(null);

  const fileName = hymnalConfig?.fileName;

  useEffect(() => {
    if (!fileName) return;

    const url = getHymnalFileUrl(fileName);
    let controller: AbortController | null = null;

    const load = async (background: boolean) => {
      controller?.abort();
      const current = new AbortController();
      controller = current;

      try {
        const response = await fetch(url, {
          cache: "no-cache",
          signal: current.signal,
        });
        if (!response.ok) {
          throw new Error(`Error fetching data (HTTP ${response.status}).`);
        }
        const jsonData: Hymn[] = await response.json();
        if (current.signal.aborted) return;
        setHymns(toHymnMap(jsonData));
        setError(null);
      } catch (fetchError) {
        if (current.signal.aborted) return;
        console.error("Error fetching JSON data:", fetchError);
        if (!background) {
          setError((fetchError as Error).toString());
        }
      }
    };

    const refresh = () => {
      if (document.visibilityState === "visible") {
        load(true);
      }
    };

    loadRef.current = load;
    load(false);

    const intervalId = window.setInterval(refresh, HYMNAL_REFRESH_INTERVAL_MS);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      controller?.abort();
      loadRef.current = null;
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [fileName]);

  /** Retry loading after a failure. */
  const reload = useCallback(() => {
    setError(null);
    loadRef.current?.(false);
  }, []);

  /** Clear loaded hymns, e.g. before switching to another hymnal. */
  const reset = useCallback(() => setHymns(null), []);

  return { hymns, error, reload, reset };
}
