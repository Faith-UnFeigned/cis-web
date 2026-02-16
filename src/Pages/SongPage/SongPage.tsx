import { Alert, AppShell, Button } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconInfoCircle, IconReload } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHymnalFileUrl, HYMNALS_CONFIG } from '../../data/hymnalsConfig';
import type { Hymn } from '../../utils/types';
import { AppHeader } from './AppHeader/AppHeader';
import FloatingButtons from './FloatingButtons/FloatingButtons';
import { HymnList } from './HymnList/HymnList';
import HymnPreview from './HymnPreview/HymnPreview';
import { PresentationMode } from './PresentationMode/PresentationMode';
import { SongPageSkeleton } from './SongPageSkeleton';

export type HymnMap = Record<number, Hymn>;

export default function SongPage() {
  const [error, setError] = useState<string | null>(null);
  const [hymns, setHymns] = useState<HymnMap | null>(null);
  const [drawerOpened, { toggle, close }] = useDisclosure();
  const [presenting, setPresenting] = useState(false);
  const [textSize, setTextSize] = useLocalStorage({
    key: 'textSize',
    defaultValue: 1.2,
    deserialize: (value) => Number(value),
  });

  const { number, key } = useParams();
  const hymnalConfig = HYMNALS_CONFIG.find((h) => h.key === key);

  // biome-ignore lint: we only want to trigger this when the hymn number & key has changed
  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'smooth' });
  }, [number, key]);

  const handleLoadedData = useCallback((jsonData: Hymn[]) => {
    setHymns(
      jsonData.reduce(
        (accumulator, current) => ({
          // biome-ignore lint: This is safely used here
          ...accumulator,
          [current.number]: current,
        }),
        {},
      ),
    );
    setError(null);
  }, []);

  const handleFetchData = useCallback(
    async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error fetching data.');
        }
        const jsonData: Hymn[] = await response.json();
        handleLoadedData(jsonData);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
        setError((error as Error).toString());
      } finally {
        console.log('Done fetching data.');
      }
    },
    [handleLoadedData],
  );

  useEffect(() => {
    if (hymnalConfig) {
      handleFetchData(getHymnalFileUrl(hymnalConfig.fileName));
    }
  }, [handleFetchData, hymnalConfig]);

  if (!hymns) {
    return error ? (
      <Alert variant="light" color="red" title="Failed to load" icon={<IconInfoCircle />}>
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
          breakpoint: 'sm',
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
        <AppShell.Navbar p="md" style={{ overflow: 'scroll' }}>
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
        <PresentationMode selectedHymn={selectedHymn} presenting={presenting} setPresenting={setPresenting} />
      )}
    </>
  );
}
