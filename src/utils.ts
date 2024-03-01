import { useCallback, useState } from 'react';

export interface Hymn {
  title: string;
  number: number;
  content?: string;
  markdown?: string;
}

export function downloadJsonFile(data: object, fileName: string): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  link.download = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getFilenameFromResponse(response: Response, defaultFilename: string) {
  try {
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = defaultFilename;
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        filename = match[1];
      }
    }
    return filename;
  } catch (error) {
    console.error('Error extracting filename:', (error as Error).message);
    return defaultFilename;
  }
}

/**
 * Returns a callback which can be used to delay any action
 * by a given time to avoid performing it too often, or too
 * much of it unnecessarily. When you perform the action one
 * after the other, It cancels the previous action if it is
 * still waiting for timeout.
 *
 * The returned callback accepts the callback which performs
 * the action, as well as the number of milliseconds to delay by
 *
 * @returns A callback which performs the required action after a delay
 */
export function useDebouncedAction() {
  const [lastAction, setLastAction] = useState<{
    timeOutId: number;
  } | null>(null);

  const delayAction = useCallback(
    (performAction: () => void, milliseconds: number) => {
      if (lastAction !== null) {
        clearTimeout(lastAction.timeOutId);
      }
      setLastAction({
        timeOutId: window.setTimeout(() => {
          setLastAction(null);
          performAction();
        }, milliseconds),
      });
    },
    [lastAction],
  );

  return delayAction;
}
