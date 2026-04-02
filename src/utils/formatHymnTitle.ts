/**
 * Formats a hymn title for display.
 *
 * Some hymnal files (e.g. Icibemba) store titles in ALL CAPS or with most
 * words uppercased. This function detects that and converts to title case so
 * all hymnals render consistently. Titles that are already mostly mixed-case
 * are returned unchanged.
 *
 * See: https://github.com/Faith-UnFeigned/cis-web/issues/175
 */
export function formatHymnTitle(title: string): string {
  if (!title) return title;

  const letters = title.replace(/[^a-zA-Z]/g, '');
  if (!letters.length) return title;

  const upperCount = (letters.match(/[A-Z]/g) || []).length;
  const upperRatio = upperCount / letters.length;

  // Normalize if more than 70% of letters are uppercase.
  // This catches fully-caps titles (e.g. Icibemba) and mixed-caps
  // titles where most words are shouted (e.g. "YESU NI MKOMBOZI").
  if (upperRatio < 0.7) return title;

  return title
    .toLowerCase()
    .replace(/(?:^|\s|[-–—])\S/g, (char) => char.toUpperCase());
}
