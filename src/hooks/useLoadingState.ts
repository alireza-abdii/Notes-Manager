import { useState, useCallback } from 'react';

export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

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
