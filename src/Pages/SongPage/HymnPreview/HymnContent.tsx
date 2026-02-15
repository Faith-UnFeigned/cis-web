import { Hymn, HymnLyricBlock } from "../../../utils/types";

export function HymnContent({ hymn }: { hymn: Hymn }) {
  return (
    <div>
      {hymn.lyrics.map((block, index) => (
        <LyricBlock key={index} block={block} />
      ))}
    </div>
  );
}

function LyricBlock({ block }: { block: HymnLyricBlock }) {
  const isRefrain = block.type === "refrain";

  return (
    <div
      style={{
        marginBottom: "1em",
        ...(isRefrain && {
          fontStyle: "italic",
          borderLeft: "3px solid currentColor",
          paddingLeft: "0.75em",
        }),
      }}
    >
      {block.lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
