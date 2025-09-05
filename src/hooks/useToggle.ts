import { useState, useCallback } from 'react';

/**
 * Custom hook for managing boolean toggle state
 * Useful for modals, dropdowns, expanded states, etc.
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Toggle the boolean value
  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  // Set to true
  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  // Set to false
  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  // Set to specific value
  const set = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    set,
  };
}
