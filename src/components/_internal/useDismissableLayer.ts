import { useEffect, type RefObject } from 'react';

interface UseDismissableLayerOptions {
  open: boolean;
  layerRef: RefObject<HTMLElement | null>;
  branchRefs?: ReadonlyArray<RefObject<HTMLElement | null>>;
  dismissOnPointerDownOutside?: boolean;
  dismissOnEscapeKeyDown?: boolean;
  onDismiss?: () => void;
  onPointerDownOutside?: (event: MouseEvent) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}

export function useDismissableLayer({
  open,
  layerRef,
  branchRefs = [],
  dismissOnPointerDownOutside = true,
  dismissOnEscapeKeyDown = true,
  onDismiss,
  onPointerDownOutside,
  onEscapeKeyDown
}: UseDismissableLayerOptions) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const isInLayer = (target: Node) => {
      if (layerRef.current?.contains(target)) {
        return true;
      }

      return branchRefs.some((ref) => ref.current?.contains(target));
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!dismissOnPointerDownOutside) {
        return;
      }

      const target = event.target as Node;
      if (isInLayer(target)) {
        return;
      }

      if (onPointerDownOutside) {
        onPointerDownOutside(event);
        return;
      }

      onDismiss?.();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dismissOnEscapeKeyDown || event.key !== 'Escape') {
        return;
      }

      if (onEscapeKeyDown) {
        onEscapeKeyDown(event);
        return;
      }

      onDismiss?.();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    open,
    layerRef,
    branchRefs,
    dismissOnPointerDownOutside,
    dismissOnEscapeKeyDown,
    onDismiss,
    onPointerDownOutside,
    onEscapeKeyDown
  ]);
}
