import { useEffect, useRef } from 'react';

export function useDebouncedCallback<A extends any[]>(
  callback: (...args: A) => void,
  wait: number
) {
  // Track args & timeout handle between calls
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // Make sure our timeout gets cleared if
  // Our consuming component gets unmounted
  useEffect(() => cleanup, []);

  return function debouncedCallback(...args: A) {
    // Capture latest args
    argsRef.current = args;

    // Clear debounce timer
    cleanup();

    // Start waiting again
    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
}
