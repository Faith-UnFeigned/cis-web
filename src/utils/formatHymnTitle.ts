/**
 * Formats a hymn title for display.
 *
 * Some hymnal files (e.g. Icibemba) store titles in ALL CAPS. This function
 * detects that case and converts to title case so all hymnals render
 * consistently. Mixed-case titles are returned unchanged.
 *
 * See: https://github.com/Faith-UnFeigned/cis-web/issues/175
 */
export function formatHymnTitle(title: string): string {
  if (!title) return title;
  // Consider a title "all caps" if it has no lowercase letters but has at least one uppercase letter
  const isAllCaps = title === title.toUpperCase() && /[A-Z]/.test(title);
  if (!isAllCaps) return title;
  return title
    .toLowerCase()
    .replace(/(?:^|\s|[-–—])\S/g, (char) => char.toUpperCase());
}
