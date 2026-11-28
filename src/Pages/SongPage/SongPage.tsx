import { useEffect, useState } from "react";
import { Alert, AppShell, Button } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { IconInfoCircle, IconReload } from "@tabler/icons-react";

import { AppHeader } from "./AppHeader/AppHeader";
import { useHymnalsConfig } from "../../Context/HymnalsConfig";
import NotFound from "../NotFound/NotFound";
import { useHymnal } from "../../utils/useHymnal";
import HymnPreview from "./HymnPreview/HymnPreview";
import FloatingButtons from "./FloatingButtons/FloatingButtons";
import { HymnList } from "./HymnList/HymnList";
import { PresentationMode } from "./PresentationMode/PresentationMode";
import { SongPageSkeleton } from "./SongPageSkeleton";

export default function SongPage() {
  const [drawerOpened, { toggle, close }] = useDisclosure();
  const [presenting, setPresenting] = useState(false);
  const [textSize, setTextSize] = useLocalStorage({
    key: "textSize",
    defaultValue: 1.2,
    deserialize: (value) => Number(value),
  });

  const { number, key } = useParams();
  const { findHymnal, status: hymnalsStatus, refresh: refreshHymnals } = useHymnalsConfig();
  const hymnalConfig = findHymnal(key);
  const { hymns, error, reload, reset } = useHymnal(hymnalConfig);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth" });
  }, [number]);

  // An unknown key may be a hymnal added upstream since the list was cached.
  useEffect(() => {
    if (!hymnalConfig && hymnalsStatus === "cached") {
      refreshHymnals();
    }
  }, [hymnalConfig, hymnalsStatus, refreshHymnals]);

  if (!hymnalConfig && (hymnalsStatus === "ready" || hymnalsStatus === "failed")) {
    return <NotFound />;
  }

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
          <Button onClick={reload}>
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
          resetHymnalData={reset}
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
