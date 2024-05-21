import { useCallback, useEffect, useState } from "react";
import { Alert, AppShell, Button, LoadingOverlay } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { IconInfoCircle, IconReload } from "@tabler/icons-react";

import { Hymn } from "../../utils/types";
import { AppHeader } from "./AppHeader/AppHeader";
import { getHymnalFileUrl } from "../../data/hymnalsConfig";
import HymnPreview from "./HymnPreview/HymnPreview";
import FloatingButtons from "./FloatingButtons/FloatingButtons";
import { HymnList } from "./HymnList/HymnList";
import { PresentationMode } from "./PresentationMode/PresentationMode";

export type HymnMap = Record<number, Hymn>;

export default function SongPage() {
    const [error, setError] = useState<string | null>(null);
    const [hymns, setHymns] = useState<HymnMap | null>(null);
    const [drawerOpened, { toggle, close }] = useDisclosure();
    const [presenting, setPresenting] = useState(false);
    const [textSize, setTextSize] = useLocalStorage({
        key: "textSize",
        defaultValue: 1.2,
        deserialize: (value) => Number(value),
    });

    const { number, language } = useParams();

    useEffect(() => {
        document.body.scrollIntoView({ behavior: "smooth" });
    }, [number]);

    const handleLoadedData = (jsonData: Hymn[]) => {
        setHymns(
            jsonData.reduce(
                (accumulator, current) => ({
                    ...accumulator,
                    [current.number]: current,
                }),
                {}
            )
        );
        setError(null);
    };

    const handleFetchData = useCallback(async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error fetching data.");
            }
            const jsonData: Hymn[] = await response.json();
            handleLoadedData(jsonData);
        } catch (error) {
            console.error("Error fetching JSON data:", error);
            setError((error as Error).toString());
        } finally {
            console.log("Done fetching data.");
        }
    }, []);

    useEffect(() => {
        if (language) {
            handleFetchData(getHymnalFileUrl(language));
        }
    }, [handleFetchData, language]);

    if (!hymns) {
        return error ? (
            <Alert
                variant="light"
                color="red"
                title="Failed to load"
                icon={<IconInfoCircle />}
            >
                <div>An error occured while attempting to load the hymnal:</div>
                <div>{error}</div>
                <p>
                    <Button
                        onClick={() => {
                            if (language) {
                                setError(null);
                                handleFetchData(getHymnalFileUrl(language));
                            }
                        }}
                    >
                        <IconReload /> Reload
                    </Button>
                </p>
            </Alert>
        ) : (
            <LoadingOverlay
                visible
                loaderProps={{ size: "lg", color: "#0aaa5e" }}
            />
        );
    }

    const selectedHymn = hymns[Number(number)];

    return (
        <>
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
                    selectedItem={Number(number)}
                    currentLanguage={language || "english"}
                    hymns={hymns}
                    resetHymnalData={() => setHymns(null)}
                />
                <AppShell.Navbar p="md" style={{ overflow: "scroll" }}>
                    <HymnList
                        error={error}
                        list={Object.values(hymns)}
                        selectedItem={Number(number)}
                        handleItemClick={() => close()}
                    />
                </AppShell.Navbar>
                <AppShell.Main>
                    <HymnPreview
                        selectedItem={selectedHymn}
                        textSize={textSize}
                    />
                    <FloatingButtons
                        textSize={textSize}
                        setTextSize={setTextSize}
                        togglePresentationMode={() =>
                            setPresenting((value) => !value)
                        }
                    />
                </AppShell.Main>
            </AppShell>
            {selectedHymn && (
                <PresentationMode
                    selectedHymn={selectedHymn}
                    presenting={presenting}
                    setPresenting={setPresenting}
                />
            )}
        </>
    );
}
