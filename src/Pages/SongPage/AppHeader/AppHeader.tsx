import { ActionIcon, AppShell, Burger, Group, NumberInput, Tooltip } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Hymn } from '../../../utils/types';
import type { HymnMap } from '../SongPage';
import classes from './AppHeader.module.css';
import { LanguageSelector } from './LanguageSelector';

export function AppHeader({
  drawerOpened,
  toggle,
  hymns,
  selectedItem,
  selectedHymn,
  resetHymnalData,
}: {
  drawerOpened: boolean;
  toggle: () => void;
  selectedHymn: Hymn | undefined;
  hymns: HymnMap;
  selectedItem: number | null;
  resetHymnalData: () => void;
}) {
  const navigate = useNavigate();
  const { key, language } = useParams();

  const navigateToSong = (song: number) => navigate(`/songs/${language}/${key}/${song}`);

  const previousHymn = () => {
    if (selectedItem && hymns[selectedItem - 1]) {
      navigateToSong(selectedItem - 1);
    }
  };

  const onNumberInput = (event: FormEvent<HTMLInputElement>) => {
    const text = (event.target as HTMLInputElement).value;
    const value = Number(text);
    if (!Number.isNaN(value) && text.trim() !== '') {
      navigateToSong(value);
    }
  };

  const nextHymn = () => {
    if (selectedItem && hymns[selectedItem + 1]) {
      navigateToSong(selectedItem + 1);
    }
  };

  return (
    <AppShell.Header>
      <Group
        h="100%"
        px="md"
        gap="xs"
        align="center"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Burger opened={drawerOpened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <Group gap="sm" align="center" style={{ justifySelf: 'center' }}>
          <Tooltip label="Previous hymn">
            <ActionIcon
              size={35}
              variant="default"
              disabled={!selectedHymn || (!!selectedItem && !hymns[selectedItem - 1])}
              onClick={previousHymn}
            >
              <IconChevronLeft />
            </ActionIcon>
          </Tooltip>
          <NumberInput
            className={classes.input}
            placeholder="Hymn"
            hideControls
            value={selectedItem || undefined}
            onInput={onNumberInput}
          />
          <Tooltip label="Next hymn">
            <ActionIcon
              size={35}
              variant="default"
              disabled={!selectedHymn || (!!selectedItem && !hymns[selectedItem + 1])}
              onClick={nextHymn}
            >
              <IconChevronRight />
            </ActionIcon>
          </Tooltip>
        </Group>

        <Group>
          <LanguageSelector selectedItem={selectedItem} resetHymnalData={resetHymnalData} />
        </Group>
      </Group>
    </AppShell.Header>
  );
}
