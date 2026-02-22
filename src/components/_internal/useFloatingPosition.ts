import { useLayoutEffect, useState, type RefObject } from 'react';

interface FloatingPosition {
  top: number;
  left: number;
  minWidth?: number;
}

interface UseFloatingPositionOptions {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  offset?: number;
  matchWidth?: boolean;
}

export function useFloatingPosition({
  open,
  anchorRef,
  offset = 8,
  matchWidth = false
}: UseFloatingPositionOptions) {
  const [position, setPosition] = useState<FloatingPosition>({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) {
        return;
      }

      const rect = anchor.getBoundingClientRect();
      setPosition({
        top: rect.bottom + offset,
        left: rect.left,
        minWidth: matchWidth ? rect.width : undefined
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [anchorRef, matchWidth, offset, open]);

  return position;
}
