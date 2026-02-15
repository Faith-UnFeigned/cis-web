import { Hymn } from "../../../utils/types";

/**
 * Converts a hymn to a list of verses which can be displayed in presentation mode.
 * V2 lyrics blocks are already interleaved with refrains, so we simply join lines.
 */
export function getVersesList(selectedHymn: Hymn): string[] {
  return selectedHymn.lyrics.map((block) => block.lines.join("\n"));
}
