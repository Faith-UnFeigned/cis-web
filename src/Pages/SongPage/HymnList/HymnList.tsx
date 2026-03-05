import { List, Select, Space, TextInput } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import type { Hymn } from '../../../utils/types';
import styles from './HymnList.module.scss';
import { HymnListItem } from './HymnListItem';

type SortOrderOption = 'number' | 'alphabetically';

export function HymnList({
  error,
  list,
  selectedItem,
  handleItemClick,
}: {
  error: string | null;
  list: Hymn[];
  selectedItem: number | null;
  handleItemClick: (hymnNumber: number) => void;
}) {
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useLocalStorage<SortOrderOption>({
    key: 'hymnListSortOrder',
    defaultValue: 'number',
  });
  const [listToDisplay, setListToDisplay] = useState(list);

  useEffect(() => {
    const listItem = document.getElementById(`hymn-${selectedItem}`);
    if (listItem) {
      listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedItem]);

  useEffect(() => {
    let result = [...list];

    if (filterText.trim() !== '') {
      const regex = new RegExp(filterText, 'i');

      result = list.filter(
        (hymn) =>
          hymn.title.match(regex) ||
          hymn.number.toString().match(regex) ||
          hymn.lyrics.some((block) => block.lines.some((line) => regex.test(line))),
      );
    }

    if (sortOrder === 'alphabetically') {
      /**
       * This RegEx is used to extract the text in a hymn's title, since the
       * titles in the various hymnal files are written in differing formats
       */
      const titleRegex = /^\s*\d*\.?:?\s*-?\s*’?‘?'?"?“?¿?¡?(.+)$/;

      result.sort((a, b) => {
        const arrayA = titleRegex.exec(a.title);
        const titleA = arrayA ? arrayA[1] : a.title;

        const arrayB = titleRegex.exec(b.title);
        const titleB = arrayB ? arrayB[1] : b.title;

        return titleA > titleB ? 1 : -1;
      });
    }

    setListToDisplay(result);
  }, [sortOrder, filterText, list]);

  return (
    <List listStyleType="none" withPadding>
      <TextInput
        type="search"
        placeholder="Search songs"
        onInput={(e) => setFilterText((e.target as HTMLInputElement).value)}
      />
      <Space style={{ height: '1em' }} />
      {/* biome-ignore lint: select is used here as an input */}
      <label className={styles.sortOrderLabel}>
        Sort:&nbsp;&nbsp;
        <Select
          style={{
            width: 160,
          }}
          value={sortOrder}
          onChange={(value) => value && setSortOrder(value as SortOrderOption)}
          variant="unstyled"
          placeholder="Sort order"
          data={[
            {
              value: 'number',
              label: 'By hymn number',
            },
            {
              value: 'alphabetically',
              label: 'Alphabetically',
            },
          ]}
        />
      </label>
      <Space style={{ height: '1em' }} />
      {!error &&
        listToDisplay?.map((item) => (
          <HymnListItem key={item.number} item={item} selectedItem={selectedItem} handleItemClick={handleItemClick} />
        ))}
    </List>
  );
}
