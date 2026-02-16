import { useParams } from 'react-router-dom';
import { HYMNALS_CONFIG } from '../../../data/hymnalsConfig';
import type { Hymn, HymnLyricBlock } from '../../../utils/types';

export function HymnContent({ hymn }: { hymn: Hymn }) {
  return (
    <div>
      {hymn.lyrics.map((block) => (
        <LyricBlock key={block.index} block={block} />
      ))}
    </div>
  );
}

function LyricBlock({ block }: { block: HymnLyricBlock }) {
  const { key } = useParams();
  const language = HYMNALS_CONFIG.find((hymnal) => hymnal.key === key);
  const isRefrain = block.type === 'refrain';
  const refrainLabel = language?.refrainLabel || 'CHORUS';
  const labelText = isRefrain ? refrainLabel : block.index ? `VERSE ${block.index}` : null;

  return (
    <div
      style={{
        marginBottom: '2em',
        ...(isRefrain && {
          fontStyle: 'italic',
          borderLeft: '3px solid currentColor',
          paddingLeft: '0.75em',
        }),
      }}
    >
      {labelText && (
        <div
          style={{
            fontSize: '0.55em',
            fontWeight: 600,
            color: 'var(--mantine-color-dimmed)',
            letterSpacing: '0.05em',
            marginBottom: '0.3em',
            fontStyle: 'normal',
          }}
        >
          {labelText}
        </div>
      )}
      {block.lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}
