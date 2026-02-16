import { useEffect, useState } from "react";
import { ActionIcon, Box, Center } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { IconMinimize } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import "@mantine/carousel/styles.css";

import classes from "./PresentationMode.module.scss";
import { Hymn } from "../../../utils/types";
import { getVersesList, PresentationSlide } from "./getVersesList";
import { HYMNALS_CONFIG } from "../../../data/hymnalsConfig";

export function PresentationMode({
    presenting,
    selectedHymn,
    setPresenting,
}: {
    selectedHymn: Hymn;
    presenting: boolean;
    setPresenting: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { key } = useParams();
    const { ref, fullscreen, toggle } = useFullscreen();
    const [slides, setSlides] = useState<PresentationSlide[]>([]);

    const language = HYMNALS_CONFIG.find((hymnal) => hymnal.key === key);
    const refrainLabel = language?.refrainLabel || "CHORUS";

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
        setSlides(getVersesList(selectedHymn, refrainLabel));
    }, [selectedHymn, refrainLabel]);

    return (
        <Box ref={ref} className={classes.box}>
            {fullscreen && (
                <>
                    <Carousel>
                        {slides.map((slide, index) => (
                            <Carousel.Slide key={`${index}:${slide.text}`}>
                                <Center className={classes.slideContainer}>
                                    <div>
                                        {slide.label && (
                                            <div className={classes.slideLabel}>
                                                {slide.label}
                                            </div>
                                        )}
                                        <div
                                            className={
                                                slide.isRefrain
                                                    ? classes.refrainText
                                                    : undefined
                                            }
                                        >
                                            {slide.text}
                                        </div>
                                    </div>
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
