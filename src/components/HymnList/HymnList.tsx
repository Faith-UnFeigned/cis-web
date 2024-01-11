import { List } from "@mantine/core";
import { Hymn } from "../../utils";
import { useEffect } from "react";

import { HymnListItem } from "./HymnListItem";

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
    useEffect(() => {
        const listItem = document.getElementById("hymn-" + selectedItem);
        if (listItem) {
            listItem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [selectedItem]);

    return (
        <List listStyleType="none" withPadding>
            {!error &&
                list?.map((item) => (
                    <HymnListItem
                        key={item.number}
                        item={item}
                        selectedItem={selectedItem}
                        handleItemClick={handleItemClick}
                    />
                ))}
        </List>
    );
}
