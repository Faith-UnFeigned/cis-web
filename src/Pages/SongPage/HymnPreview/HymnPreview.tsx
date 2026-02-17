import { Center, TypographyStylesProvider } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { HYMNALS_CONFIG } from '../../../data/hymnalsConfig';
import type { Hymn } from '../../../utils/types';
import { NoHymnMessage } from '../ErrorMessages/ErrorMessages';
import { HymnContent } from './HymnContent';
import classes from './HymnPreview.module.css';

export default function HymnPreview({ selectedItem, textSize }: { selectedItem?: Hymn; textSize: number }) {
  const { language } = useParams();

  useDocumentTitle(
    `${selectedItem?.title} | ${HYMNALS_CONFIG.find((value) => value.key === language)?.title || 'Christ in Song'}` ||
      'Christ in Song on the Web',
  );

  return (
    <Center>
      {selectedItem ? (
        <TypographyStylesProvider className={classes.preview} style={{ fontSize: `${textSize}em` }}>
          <HymnContent hymn={selectedItem} />
        </TypographyStylesProvider>
      ) : (
        <NoHymnMessage />
      )}
    </Center>
  );
}
