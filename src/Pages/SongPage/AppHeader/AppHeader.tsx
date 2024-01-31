import { FormEvent, useState } from "react";
import {
    AppShell,
    Burger,
    Group,
    Tooltip,
    ActionIcon,
    NumberInput,
    Modal,
    TextInput,
    List,
    NavLink,
    Space,
} from "@mantine/core";
import { Hymn } from "../../../utils";
import {
    IconChevronLeft,
    IconChevronRight,
    IconLanguage,
} from "@tabler/icons-react";

import classes from "./AppHeader.module.css";
import { HymnMap } from "../SongPage";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { HYMNALS_CONFIG } from "../../../data/hymnalsConfig";

export function AppHeader({
    drawerOpened,
    toggle,
    hymns,
    selectedItem,
    currentLanguage,
    selectedHymn,
    resetHymnalData,
}: {
    drawerOpened: boolean;
    toggle: () => void;
    selectedHymn: Hymn | undefined;
    hymns: HymnMap;
    selectedItem: number | null;
    currentLanguage: string;
    resetHymnalData: () => void;
}) {
    let navigate = useNavigate();

    const navigateToSong = (song: number) =>
        navigate(`/songs/${currentLanguage}/${song}`);

    const previousHymn = () => {
        if (selectedItem && hymns[selectedItem - 1]) {
            navigateToSong(selectedItem - 1);
        }
    };

    const onNumberInput = (event: FormEvent<HTMLInputElement>) => {
        const text = (event.target as HTMLInputElement).value;
        const value = Number(text);
        if (!Number.isNaN(value) && text.trim() !== "") {
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
                    <LanguageSelector
                        selectedItem={selectedItem}
                        resetHymnalData={resetHymnalData}
                    />
                </Group>
            </Group>
        </AppShell.Header>
    );
}

function LanguageSelector({
    selectedItem,
    resetHymnalData,
}: {
    selectedItem: number | null;
    resetHymnalData: () => void;
}) {
    const [opened, { open, close }] = useDisclosure(false);
    let [filterText, setFilterText] = useState("");

    const searchRegex = new RegExp(filterText, "i");

    const filteredHymnals =
        filterText.trim() !== ""
            ? HYMNALS_CONFIG.filter(
                  (hymnal) =>
                      hymnal.title.match(searchRegex) ||
                      hymnal.language.match(searchRegex)
              )
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
                style={{ overflow: "hidden" }}
            >
                <TextInput
                    type="search"
                    placeholder="Search hymnals"
                    onInput={(e) =>
                        setFilterText((e.target as HTMLInputElement).value)
                    }
                    autoFocus
                />
                <Space style={{ height: "0.7em" }} />
                <List listStyleType="none">
                    {[...filteredHymnals]
                        .sort((a, b) => (a.title < b.title ? -1 : 1))
                        .map((value) => (
                            <Link
                                key={value.key}
                                to={`/songs/${value.key}/${selectedItem}`}
                                onClick={() => {
                                    close();
                                    resetHymnalData();
                                }}
                            >
                                <NavLink
                                    label={value.title}
                                    description={value.language}
                                />
                            </Link>
                        ))}
                </List>
            </Modal>
        </>
    );
}
