import React, { useState, useEffect, RefObject } from 'react'

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} ele
 * @param {boolean} initialState
 */
export function useDetectOutsideClick<T extends HTMLElement>(
  ele: RefObject<T>,
  initialState: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isActive, setIsActive] = useState<boolean>(initialState)

  useEffect(() => {
    const onClick = (e: Event) => {
      // If the active element exists and is clicked outside of
      if (ele.current !== null && !ele.current.contains(e.target as Node)) {
        setIsActive(!isActive)
      }
    }

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener('click', onClick)
    }

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [isActive, ele])

  return [isActive, setIsActive]
}
