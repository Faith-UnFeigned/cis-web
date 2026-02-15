export interface HymnLyricBlock {
    type: "verse" | "refrain";
    index?: number;
    lines: string[];
}

export interface Hymn {
    number: number;
    title: string;
    index?: string;
    title_english?: string;
    hymnal_references?: string;
    revision?: number;
    lyrics: HymnLyricBlock[];
}
