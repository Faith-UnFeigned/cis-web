import { List, Space, TextInput } from "@mantine/core";
import { Hymn } from "../../../utils";
import { useEffect, useState } from "react";

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
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        const listItem = document.getElementById("hymn-" + selectedItem);
        if (listItem) {
            listItem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [selectedItem]);

    const regex = new RegExp(filterText, "i");

    const filteredList =
        filterText.trim() !== ""
            ? list.filter(
                  (hymn) =>
                      hymn.content?.match(regex) ||
                      hymn.markdown?.match(regex) ||
                      hymn.title.match(regex) ||
                      hymn.number.toString().match(regex)
              )
            : list;

    return (
        <List listStyleType="none" withPadding>
            <TextInput
                type="search"
                placeholder="Search songs"
                onInput={(e) =>
                    setFilterText((e.target as HTMLInputElement).value)
                }
            />
            <Space style={{ height: "0.7em" }} />
            {!error &&
                filteredList?.map((item) => (
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
