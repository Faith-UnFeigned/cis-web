import ReactMarkdown from "react-markdown";
import { InvalidHymnMessage } from "../ErrorMessages/ErrorMessages";

export function HymnContent({ hymn }: { hymn: Hymn }) {
  const content = hymn.content || hymn.markdown;

  if (!content) {
    return <InvalidHymnMessage selectedHymn={hymn} />;
  }

  // Since some hymn.content are not trully html, we first check if it contains some tags before rendering it.
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return <ReactMarkdown>{content}</ReactMarkdown>;
}
