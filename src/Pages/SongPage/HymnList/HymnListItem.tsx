import { List, Text, useMantineTheme } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { useColorMode } from '../../../Context/ColorMode';
import type { Hymn } from '../../../utils/types';

export function HymnListItem({
  item,
  selectedItem,
  handleItemClick,
}: {
  item: Hymn;
  selectedItem: number | null;
  handleItemClick: (hymnNumber: number) => void;
}) {
  const theme = useMantineTheme();
  const { colorMode } = useColorMode();
  const { language, key } = useParams();

  return (
    <Link to={`/songs/${language}/${key}/${item.number}`} onClick={() => handleItemClick(item.number)}>
      <List.Item
        id={`hymn-${item.number}`}
        style={{
          cursor: 'pointer',
          '--hover-color': theme.colors.gray[colorMode === 'dark' ? 9 : 0],
          backgroundColor: selectedItem === item.number ? (colorMode === 'dark' ? '#333' : '#eee') : 'transparent',
          paddingLeft: theme.spacing.md,
          paddingTop: theme.spacing.xs,
          paddingBottom: theme.spacing.xs,
          // borderLeft: `3px solid ${theme.colors.blue[6]}`,
          borderRadius: theme.radius.sm,
          marginBottom: theme.spacing.xs,
        }}
      >
        <Text
          style={{
            fontWeight: selectedItem === item.number ? 'bold' : 'normal',
          }}
        >
          {item.title}
        </Text>
      </List.Item>
    </Link>
  );
}
