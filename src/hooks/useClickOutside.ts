import { useEffect, useRef } from 'react';

/**
 * Custom hook that handles clicking outside of a referenced element
 * @param handler - Function to call when clicking outside
 * @returns ref - Ref to attach to the element that should detect outside clicks
 */
export function useClickOutside<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
}
