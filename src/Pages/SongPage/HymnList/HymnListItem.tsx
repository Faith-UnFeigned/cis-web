import { List, Text, useMantineTheme } from "@mantine/core";

import { useColorMode } from "../../../Context/ColorMode";
import { Hymn } from "../../../utils";

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

    return (
        <List.Item
            id={"hymn-" + item.number}
            onClick={() => handleItemClick(item.number)}
            style={{
                cursor: "pointer",
                "--hover-color":
                    theme.colors.gray[colorMode === "dark" ? 9 : 0],
                backgroundColor:
                    selectedItem === item.number
                        ? theme.colors.gray[colorMode === "dark" ? 8 : 1]
                        : "transparent",
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
                    fontWeight:
                        selectedItem === item.number ? "bold" : "normal",
                }}
            >
                {item.title}
            </Text>
        </List.Item>
    );
}
