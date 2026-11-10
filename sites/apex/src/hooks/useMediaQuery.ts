import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Mouse / trackpad devices: the only place pointer-driven effects run. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
