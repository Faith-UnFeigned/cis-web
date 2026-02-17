import { ActionIcon, List, Modal, NavLink, Space, TextInput, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLanguage } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { HYMNALS_CONFIG } from '../../../data/hymnalsConfig';

export function LanguageSelector({
  selectedItem,
  resetHymnalData,
}: {
  selectedItem: number | null;
  resetHymnalData: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [filterText, setFilterText] = useState('');

  const searchRegex = new RegExp(filterText, 'i');

  const filteredHymnals =
    filterText.trim() !== ''
      ? HYMNALS_CONFIG.filter((hymnal) => hymnal.title.match(searchRegex) || hymnal.language.match(searchRegex))
      : HYMNALS_CONFIG;

  return (
    <>
      <Tooltip label="Change Hymnal Version">
        <ActionIcon size={35} variant="default" onClick={() => open()}>
          <IconLanguage />
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={opened}
        onClose={close}
        title="Select Hymnal Version"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        style={{ overflow: 'hidden' }}
      >
        <TextInput
          type="search"
          placeholder="Search hymnals"
          onInput={(e) => setFilterText((e.target as HTMLInputElement).value)}
          autoFocus
        />
        <Space style={{ height: '0.7em' }} />
        <List listStyleType="none">
          {[...filteredHymnals]
            .sort((a, b) => (a.title < b.title ? -1 : 1))
            .map((value) => (
              <Link
                key={value.key}
                to={`/songs/${value.fileName}/${selectedItem}`}
                onClick={() => {
                  close();
                  resetHymnalData();
                }}
              >
                <NavLink label={value.title} description={value.language} />
              </Link>
            ))}
        </List>
      </Modal>
    </>
  );
}
