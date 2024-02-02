import { Center, TypographyStylesProvider } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import { useDocumentTitle } from "@mantine/hooks";
import { useParams } from "react-router-dom";

import classes from "./HymnPreview.module.css";
import {
    InvalidHymnMessage,
    NoHymnMessage,
} from "../ErrorMessages/ErrorMessages";
import { Hymn } from "../../../utils";
import { HYMNALS_CONFIG } from "../../../data/hymnalsConfig";

export default function HymnPreview({
    selectedItem,
    textSize,
}: {
    selectedItem?: Hymn;
    textSize: number;
}) {
    const { language } = useParams();

    useDocumentTitle(
        `${selectedItem?.title} | ${
            HYMNALS_CONFIG.find((value) => value.key === language)?.title ||
            "Christ in Song"
        }` || "Christ in Song on the Web"
    );

    return (
        <Center>
            {selectedItem ? (
                <TypographyStylesProvider
                    className={classes.preview}
                    style={{ fontSize: `${textSize}em` }}
                >
                    {selectedItem?.content ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: selectedItem.content || "",
                            }}
                        />
                    ) : selectedItem?.markdown ? (
                        <ReactMarkdown>{selectedItem.markdown}</ReactMarkdown>
                    ) : (
                        <InvalidHymnMessage selectedHymn={selectedItem} />
                    )}
                </TypographyStylesProvider>
            ) : (
                <NoHymnMessage />
            )}
        </Center>
    );
}
