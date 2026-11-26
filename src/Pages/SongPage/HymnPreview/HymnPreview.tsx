import { Center, TypographyStylesProvider } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { useParams } from "react-router-dom";

import classes from "./HymnPreview.module.css";
import { NoHymnMessage } from "../ErrorMessages/ErrorMessages";
import { Hymn } from "../../../utils/types";
import { useHymnalsConfig } from "../../../Context/HymnalsConfig";
import { HymnContent } from "./HymnContent";

export default function HymnPreview({
  selectedItem,
  textSize,
}: {
  selectedItem?: Hymn;
  textSize: number;
}) {
  const { key } = useParams();
  const hymnalTitle = useHymnalsConfig().findHymnal(key)?.title;

  useDocumentTitle(
    `${selectedItem?.title} | ${hymnalTitle || "Christ in Song"}` ||
      "Christ in Song on the Web",
  );

  return (
    <Center>
      {selectedItem ? (
        <TypographyStylesProvider
          className={classes.preview}
          style={{ fontSize: `${textSize}em` }}
        >
          <HymnContent hymn={selectedItem} />
        </TypographyStylesProvider>
      ) : (
        <NoHymnMessage />
      )}
    </Center>
  );
}
