import { useState, useCallback } from 'react';

/**
 * Custom hook for managing loading states with optional delay
 * Useful for showing loading indicators during async operations
 */
export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  // Start loading state
  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  // Stop loading state
  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Execute an async operation with loading state
  const withLoading = useCallback(async <T>(
    operation: () => Promise<T>,
    minDelay = 0
  ): Promise<T> => {
    setIsLoading(true);

    try {
      const [result] = await Promise.all([
        operation(),
        minDelay > 0 ? new Promise(resolve => setTimeout(resolve, minDelay)) : Promise.resolve(),
      ]);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
}
