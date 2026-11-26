import { useCallback, useEffect, useState } from "react";
import { Alert, AppShell, Button } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { IconInfoCircle, IconReload } from "@tabler/icons-react";

import { Hymn } from "../../utils/types";
import { AppHeader } from "./AppHeader/AppHeader";
import { getHymnalFileUrl, HYMNALS_CONFIG } from "../../data/hymnalsConfig";
import HymnPreview from "./HymnPreview/HymnPreview";
import FloatingButtons from "./FloatingButtons/FloatingButtons";
import { HymnList } from "./HymnList/HymnList";
import { PresentationMode } from "./PresentationMode/PresentationMode";
import { SongPageSkeleton } from "./SongPageSkeleton";

export type HymnMap = Record<number, Hymn>;

const HYMNAL_REFRESH_INTERVAL_MS = 10 * 60 * 1000;

export default function SongPage() {
  const [error, setError] = useState<string | null>(null);
  const [hymns, setHymns] = useState<HymnMap | null>(null);
  const [drawerOpened, { toggle, close }] = useDisclosure();
  const [presenting, setPresenting] = useState(false);
  const [textSize, setTextSize] = useLocalStorage({
    key: "textSize",
    defaultValue: 1.2,
    deserialize: (value) => Number(value),
  });

  const { number, key } = useParams();
  const hymnalConfig = HYMNALS_CONFIG.find((h) => h.key === key?.toLowerCase());

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth" });
  }, [number]);

  const handleLoadedData = useCallback((jsonData: Hymn[]) => {
    setHymns(
      jsonData.reduce(
        (accumulator, current) => ({
          ...accumulator,
          [current.number]: current,
        }),
        {},
      ),
    );
    setError(null);
  }, []);

  const handleFetchData = useCallback(
    async (url: string, { signal, background = false }: { signal?: AbortSignal; background?: boolean } = {}) => {
      try {
        // `no-cache` makes the browser revalidate with the server (ETag) instead of
        // serving a possibly stale cached copy, so newly added hymns show up.
        const response = await fetch(url, { cache: "no-cache", signal });
        if (!response.ok) {
          throw new Error("Error fetching data.");
        }
        const jsonData: Hymn[] = await response.json();
        if (signal?.aborted) return;
        handleLoadedData(jsonData);
      } catch (error) {
        if (signal?.aborted) return;
        console.error("Error fetching JSON data:", error);
        // A failed background refresh keeps the hymns already on screen.
        if (!background) {
          setError((error as Error).toString());
        }
      }
    },
    [handleLoadedData],
  );

  useEffect(() => {
    if (!hymnalConfig) return;

    const url = getHymnalFileUrl(hymnalConfig.fileName);
    let controller = new AbortController();
    handleFetchData(url, { signal: controller.signal });

    // Silently refresh so hymns added upstream appear without a manual reload,
    // e.g. when the tab stays open for a long time.
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      controller.abort();
      controller = new AbortController();
      handleFetchData(url, { signal: controller.signal, background: true });
    };

    const intervalId = window.setInterval(refresh, HYMNAL_REFRESH_INTERVAL_MS);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [handleFetchData, hymnalConfig]);

  if (!hymns) {
    return error ? (
      <Alert
        variant="light"
        color="red"
        title="Failed to load"
        icon={<IconInfoCircle />}
      >
        <div>An error occured while attempting to load the hymnal:</div>
        <div>{error}</div>
        <p>
          <Button
            onClick={() => {
              if (hymnalConfig) {
                setError(null);
                handleFetchData(getHymnalFileUrl(hymnalConfig.fileName));
              }
            }}
          >
            <IconReload /> Reload
          </Button>
        </p>
      </Alert>
    ) : (
      <SongPageSkeleton />
    );
  }

  const selectedHymn = hymns[Number(number)];

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !drawerOpened },
        }}
        padding="md"
      >
        <AppHeader
          drawerOpened={drawerOpened}
          toggle={toggle}
          selectedHymn={selectedHymn}
          selectedItem={Number(number)}
          hymns={hymns}
          resetHymnalData={() => setHymns(null)}
        />
        <AppShell.Navbar p="md" style={{ overflow: "scroll" }}>
          <HymnList
            error={error}
            list={Object.values(hymns)}
            selectedItem={Number(number)}
            handleItemClick={() => close()}
          />
        </AppShell.Navbar>
        <AppShell.Main>
          <HymnPreview selectedItem={selectedHymn} textSize={textSize} />
          <FloatingButtons
            textSize={textSize}
            setTextSize={setTextSize}
            togglePresentationMode={() => setPresenting((value) => !value)}
          />
        </AppShell.Main>
      </AppShell>
      {selectedHymn && (
        <PresentationMode
          selectedHymn={selectedHymn}
          presenting={presenting}
          setPresenting={setPresenting}
        />
      )}
    </>
  );
}
