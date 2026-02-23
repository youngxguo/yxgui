import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
}

/**
 * Renders children into `document.body` and safely returns `null` during SSR.
 */
export function Portal({ children }: PortalProps) {
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(children, document.body);
}
