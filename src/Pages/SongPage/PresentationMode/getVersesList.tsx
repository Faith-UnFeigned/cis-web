import { Hymn } from "../../../utils/types";

/**
 * Converts a hymn to a list of verses which can be displayed in presentation mode
 *
 * @param selectedHymn The hymn to convert
 */
export function getVersesList(selectedHymn: Hymn) {
    const [type, content] = selectedHymn.content
        ? ["html", selectedHymn.content]
        : selectedHymn.markdown
        ? ["markdown", selectedHymn.markdown]
        : [null, ""];

    if (type) {
        const formattedVerses =
            type === "html"
                ? reformatHtmlVerses(content)
                : content.split("\n\n");

        // Based on: https://github.com/TinasheMzondiwa/cis-android/blob/33ad4066f409215780b11ff813e5fb77ee806c46/app/src/main/kotlin/com/tinashe/hymnal/ui/hymns/sing/present/PresentPagerAdapter.kt#L17C1-L27C28
        const finalVerses: Array<string> = [];
        const chorus = formattedVerses.find((element) =>
            /CHORUS/i.test(element)
        );

        for (const [index, verse] of formattedVerses.entries()) {
            finalVerses.push(verse);
            if (index > 2 && chorus && !/CHORUS/i.test(verse)) {
                finalVerses.push(chorus);
            }
        }

        return finalVerses;
    } else {
        return [];
    }
}

/**
 * Reformats HTML verses for displaying in the presentation mode
 *
 * @param content The HTML text of a hymn
 */
function reformatHtmlVerses(content: string) {
    return content
        .split(
            // Line breaks and end of headings or paragraphs
            /(<br\s*\/?>\s*<br\s*\/?>)|(<\/h\d>)|(<\/p>)|(<\/b>(<br\s*\/?>)?<p>)/g
        )
        .map((item) => item?.replaceAll(/<br\s*\/?>/g, "\n"))
        .map((item) =>
            // Strip out HTML tags
            item?.replaceAll(/<\/?(\w|\d|\s|#|"|'|:|=)*>/g, " ").trim()
        )
        .filter((item) => item && item.trim() !== "");
}
