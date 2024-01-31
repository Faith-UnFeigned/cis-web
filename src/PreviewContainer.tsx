import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Hymn, getFilenameFromResponse, downloadJsonFile } from "./utils";
import { AppHeader } from "./Pages/SongPage/AppHeader/AppHeader";
import FloatingButtons from "./Pages/SongPage/FloatingButtons/FloatingButtons";
import { HymnList } from "./Pages/SongPage/HymnList/HymnList";
import HymnPreview from "./Pages/SongPage/HymnPreview/HymnPreview";

export type HymnMap = Record<number, Hymn>;
const TEMP_URL =
    "https://raw.githubusercontent.com/TinasheMzondiwa/cis-hymnals/main/english.json";

export default function PreviewContainer() {
    const [selectedItem, setSelectedItem] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [, setOriginalHymns] = useState<Hymn[] | null>(null);
    const [editedHymns, setEditedHymns] = useState<HymnMap | null>(null);
    const [, setEditing] = useState(false);
    const [drawerOpened, { toggle, close }] = useDisclosure();
    const [fileName, setFileName] = useState("hymnal.json");

    useEffect(() => {
        document.body.scrollIntoView({ behavior: "smooth" });
    }, [selectedItem]);

    const handleLoadedData = (jsonData: Hymn[], fileName: string) => {
        setOriginalHymns(jsonData);
        setEditedHymns(
            jsonData.reduce(
                (accumulator, current) => ({
                    ...accumulator,
                    [current.number]: current,
                }),
                {}
            )
        );
        setSelectedItem(jsonData[0].number);
        setError(null);
        setFileName(fileName);
    };

    const handleFetchData = useCallback(async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error fetching data.");
            }
            const jsonData: Hymn[] = await response.json();
            handleLoadedData(
                jsonData,
                getFilenameFromResponse(response, "hymnal.json")
            );
        } catch (error) {
            console.error("Error fetching JSON data:", error);
            setError(error as string);
            open();
        } finally {
            console.log("Done fetching data.");
        }
    }, []);

    //   This is temporal
    useEffect(() => {
        if (!editedHymns) {
            handleFetchData(TEMP_URL);
        }
    }, [editedHymns, handleFetchData]);

    const handleItemClick = (hymnNumber: number) => {
        close();
        setSelectedItem(hymnNumber);
    };

    if (!editedHymns) {
        return null;
    }

    const selectedHymn = editedHymns?.[selectedItem];

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !drawerOpened },
            }}
            padding="md"
        >
            <AppHeader
                drawerOpened={drawerOpened}
                toggle={toggle}
                selectedHymn={selectedHymn}
                hymns={editedHymns}
                toggleEditing={() => setEditing((value) => !value)}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
            />
            <AppShell.Navbar p="md" style={{ overflow: "scroll" }}>
                <HymnList
                    error={error}
                    list={Object.values(editedHymns)}
                    selectedItem={selectedItem}
                    handleItemClick={handleItemClick}
                />
            </AppShell.Navbar>
            <AppShell.Main>
                <HymnPreview selectedItem={selectedHymn} />
                <FloatingButtons
                    uploadAnotherFile={() => {
                        setOriginalHymns(null);
                        setSelectedItem(1);
                        setEditedHymns(null);
                    }}
                    downloadJson={() =>
                        downloadJsonFile(
                            Object.values(editedHymns).sort(
                                (a, b) => a.number - b.number
                            ),
                            fileName
                        )
                    }
                />
            </AppShell.Main>
        </AppShell>
    );
}
