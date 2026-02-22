import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
}

export function Portal({ children }: PortalProps) {
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(children, document.body);
}
