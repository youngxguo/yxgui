import { useLayoutEffect, useState, type RefObject } from 'react';

interface FloatingPosition {
  top: number;
  left: number;
  /** Optional width lock used by trigger-matched popovers/menus. */
  minWidth?: number;
}

interface UseFloatingPositionOptions {
  /** Enables listeners and position updates while the floating layer is open. */
  open: boolean;
  /** Anchor element used as the positioning reference. */
  anchorRef: RefObject<HTMLElement | null>;
  /** Vertical gap between the anchor and floating content. */
  offset?: number;
  /** When true, sets `minWidth` to the anchor width. */
  matchWidth?: boolean;
}

/**
 * Computes a simple fixed-position anchor-aligned floating layer position.
 *
 * Updates on resize and ancestor scroll while open.
 */
export function useFloatingPosition({
  open,
  anchorRef,
  offset = 8,
  matchWidth = false
}: UseFloatingPositionOptions) {
  const [position, setPosition] = useState<FloatingPosition>({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // Skip listener work entirely while the layer is closed.
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

    // Measure immediately so the first open paint uses the latest anchor geometry.
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
