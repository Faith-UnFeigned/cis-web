import { Center, TypographyStylesProvider } from "@mantine/core";
import ReactMarkdown from "react-markdown";

import classes from "./HymnPreview.module.css";
import { Hymn } from "../../utils";
import {
    InvalidHymnMessage,
    NoHymnMessage,
} from "../ErrorMessages/ErrorMessages";

export default function HymnPreview({ selectedItem }: { selectedItem?: Hymn }) {
    return (
        <Center>
            {selectedItem ? (
                <TypographyStylesProvider className={classes.preview}>
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
