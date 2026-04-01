import { useCallback, useState } from 'react';

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
        timeOutId: setTimeout(() => {
          setLastAction(null);
          performAction();
        }, milliseconds),
      });
    },
    [lastAction],
  );

  return delayAction;
}
