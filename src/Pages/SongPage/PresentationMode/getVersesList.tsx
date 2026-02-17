import type { Hymn } from "../../../utils/types";

export interface PresentationSlide {
	text: string;
	label: string | null;
	isRefrain: boolean;
}

/**
 * Converts a hymn to a list of slides which can be displayed in presentation mode.
 * V2 lyrics blocks are already interleaved with refrains, so we simply join lines.
 */
export function getVersesList(
	selectedHymn: Hymn,
	refrainLabel: string,
): PresentationSlide[] {
	return selectedHymn.lyrics.map((block) => {
		const isRefrain = block.type === "refrain";
		return {
			text: block.lines.join("\n"),
			label: isRefrain
				? refrainLabel
				: block.index
					? `VERSE ${block.index}`
					: null,
			isRefrain,
		};
	});
}
