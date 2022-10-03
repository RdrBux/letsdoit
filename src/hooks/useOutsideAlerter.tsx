import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref: any, action: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setTimeout(() => {
          action();
        }, 10);
      }
    }
    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [ref, action]);
}
