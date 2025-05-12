import { useState, useCallback, useEffect } from 'react';

type CopyFn = (text: string) => Promise<boolean>;

export function useClipboard(resetDelay = 2000): {
  isCopied: boolean;
  copy: CopyFn;
  error: Error | null;
} {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [resetTimer, setResetTimer] = useState<number | null>(null);

  // Clear the timeout when the component unmounts or when isCopied changes
  useEffect(() => {
    return () => {
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, [resetTimer]);

  const copy: CopyFn = useCallback(async (text: string) => {
    // Clear any existing timer
    if (resetTimer) {
      window.clearTimeout(resetTimer);
      setResetTimer(null);
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);

      // Set the timer to reset the copied state
      const timerId = window.setTimeout(() => {
        setIsCopied(false);
      }, resetDelay);

      setResetTimer(timerId);
      return true;
    } catch (err) {
      setIsCopied(false);
      setError(err instanceof Error ? err : new Error('Failed to copy to clipboard'));
      return false;
    }
  }, [resetDelay, resetTimer]);

  return { isCopied, copy, error };
}
