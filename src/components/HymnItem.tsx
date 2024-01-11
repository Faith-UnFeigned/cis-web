import { List, useMantineTheme, Text } from '@mantine/core';
import { ItemProps } from '../utils';

interface Props {
    item: ItemProps;
    selectedItem: string | null;
    handleItemClick: (content?: string) => void;
}


const HymnItem = ({ item, selectedItem, handleItemClick }: Props) => {
  const theme = useMantineTheme();
  return (
    <List.Item
      onClick={() => handleItemClick(item.content || item.markdown)}
      style={{
        cursor: 'pointer',
        backgroundColor:
          selectedItem === item.content ? theme.colors.gray[0] : 'transparent',
        paddingLeft: theme.spacing.md,
        paddingTop: theme.spacing.xs,
        paddingBottom: theme.spacing.xs,
        borderLeft: `3px solid ${theme.colors.blue[6]}`,
        borderRadius: theme.radius.sm,
        marginBottom: theme.spacing.xs,
      }}
    >
      <Text
        style={{
          fontWeight: selectedItem === item.content ? 'bold' : 'normal',
        }}
      >
        {item.title}
      </Text>
    </List.Item>
  );
};


export default HymnItem
