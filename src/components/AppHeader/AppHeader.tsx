import { FormEvent } from "react";
import {
    AppShell,
    Burger,
    Group,
    Tooltip,
    ActionIcon,
    NumberInput,
} from "@mantine/core";
import { Hymn } from "../../utils";
import {
    IconChevronLeft,
    IconChevronRight,
    IconPencil,
} from "@tabler/icons-react";

import classes from "./AppHeader.module.css";
import { HymnMap } from "../../PreviewContainer";

export function AppHeader({
    drawerOpened,
    toggle,
    selectedHymn,
    hymns,
    toggleEditing,
    setSelectedItem,
    selectedItem,
}: {
    drawerOpened: boolean;
    toggle: () => void;
    selectedHymn: Hymn | undefined;
    hymns: HymnMap;
    toggleEditing: () => void;
    setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
    selectedItem: number | null;
}) {
    const previousHymn = () => {
        if (selectedItem && hymns[selectedItem - 1]) {
            setSelectedItem(selectedItem - 1);
        }
    };

    const onNumberInput = (event: FormEvent<HTMLInputElement>) => {
        const text = (event.target as HTMLInputElement).value;
        const value = Number(text);
        if (!Number.isNaN(value) && text.trim() !== "") {
            setSelectedItem(value);
        }
    };

    const nextHymn = () => {
        if (selectedItem && hymns[selectedItem + 1]) {
            setSelectedItem(selectedItem + 1);
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
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <Burger
                    opened={drawerOpened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />

                <Group
                    gap="sm"
                    align="center"
                    style={{ justifySelf: "center" }}
                >
                    <Tooltip label="Previous hymn">
                        <ActionIcon
                            size={35}
                            variant="default"
                            disabled={
                                !selectedHymn ||
                                (!!selectedItem && !hymns[selectedItem - 1])
                            }
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
                            disabled={
                                !selectedHymn ||
                                (!!selectedItem && !hymns[selectedItem + 1])
                            }
                            onClick={nextHymn}
                        >
                            <IconChevronRight />
                        </ActionIcon>
                    </Tooltip>
                </Group>

                <Group>
                    <Tooltip label="Toggle editing">
                        <ActionIcon
                            size={35}
                            variant="default"
                            onClick={toggleEditing}
                        >
                            <IconPencil />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
        </AppShell.Header>
    );
}
