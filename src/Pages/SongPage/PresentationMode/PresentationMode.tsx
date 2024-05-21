import { useEffect, useState } from "react";
import { ActionIcon, Box, Center } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { IconMinimize } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import "@mantine/carousel/styles.css";

import classes from "./PresentationMode.module.scss";
import { Hymn } from "../../../utils/types";
import { getVersesList } from "./getVersesList";

export function PresentationMode({
    presenting,
    selectedHymn,
    setPresenting,
}: {
    selectedHymn: Hymn;
    presenting: boolean;
    setPresenting: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { ref, fullscreen, toggle } = useFullscreen();
    const [verses, setVerses] = useState<Array<string>>([]);

    useEffect(() => {
        // When the user exits fullscreen by pressing "Esc" on desktop or the
        // back button on mobile, we want to still update the "presenting" state
        if (!fullscreen) {
            setPresenting(false);
        }
    }, [fullscreen, setPresenting]);

    useEffect(() => {
        // Enter or exit full screen when the "presenting" state changes
        if ((!fullscreen && presenting) || (fullscreen && !presenting)) {
            toggle();
        }
    }, [fullscreen, presenting, toggle]);

    useEffect(() => {
        setVerses(getVersesList(selectedHymn));
    }, [selectedHymn, setVerses]);

    return (
        <Box ref={ref} className={classes.box}>
            {fullscreen && (
                <>
                    <Carousel>
                        {verses.map((verse, index) => (
                            <Carousel.Slide key={`${index}:${verse}`}>
                                <Center className={classes.slideContainer}>
                                    <ReactMarkdown>{verse}</ReactMarkdown>
                                </Center>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                    <ActionIcon
                        variant="default"
                        size={50}
                        className={classes.exitButton}
                        onClick={() => setPresenting(false)}
                    >
                        <IconMinimize />
                    </ActionIcon>
                </>
            )}
        </Box>
    );
}
