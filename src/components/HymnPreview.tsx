import { Center, TypographyStylesProvider } from '@mantine/core';
import ReactMarkdown from 'react-markdown';

const HymnPreview = ({ selectedItem }: { selectedItem: string | null }) => {
  return (
    <Center>
    <TypographyStylesProvider>
      {selectedItem && selectedItem.startsWith('<h1>') ? (
        <div dangerouslySetInnerHTML={{ __html: selectedItem || '' }} />
      ) : (
        selectedItem && <ReactMarkdown>{selectedItem}</ReactMarkdown>
      )}
    </TypographyStylesProvider>
  </Center>
  )
};

export default HymnPreview;
