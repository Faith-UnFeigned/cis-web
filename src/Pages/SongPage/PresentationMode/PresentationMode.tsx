import { useEffect, useState } from "react";
import { ActionIcon, Box, Center } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { IconMinimize } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import "@mantine/carousel/styles.css";

import classes from "./PresentationMode.module.scss";
import { Hymn } from "../../../utils";

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
        const [type, content] = selectedHymn.content
            ? ["html", selectedHymn.content]
            : selectedHymn.markdown
            ? ["markdown", selectedHymn.markdown]
            : [null, ""];

        if (type) {
            const formattedVerses =
                type === "html"
                    ? content
                          .split(
                              // Line breaks and end of headings or paragraphs
                              /(<br\s*\/?>\s*<br\s*\/?>)|(<\/h\d>)|(<\/p>)|(<\/b>)/g
                          )
                          .map((item) => item?.replaceAll(/<br\s*\/?>/g, "\n"))
                          .map((item) =>
                              // Strip out HTML tags
                              item
                                  ?.replaceAll(/<\/?(\w|\d|\s|#|"|'|=)*>/g, " ")
                                  .trim()
                          )
                          .filter((item) => item && item.trim() !== "")
                    : content.split("\n\n");

            const finalVerses: Array<string> = [];
            const chorus = formattedVerses.find((element) =>
                /CHORUS/i.test(element)
            );

            // Based on: https://github.com/TinasheMzondiwa/cis-android/blob/33ad4066f409215780b11ff813e5fb77ee806c46/app/src/main/kotlin/com/tinashe/hymnal/ui/hymns/sing/present/PresentPagerAdapter.kt#L20
            for (const [index, verse] of formattedVerses.entries()) {
                finalVerses.push(verse);
                if (index > 2 && chorus && !/CHORUS/i.test(verse)) {
                    finalVerses.push(chorus);
                }
            }

            setVerses(finalVerses);
        } else {
            setVerses([]);
        }
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
