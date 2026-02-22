import type { CSSProperties } from 'react';
import { getMenuContentStyleProps, getMenuItemStyleProps } from '../../styles/menu';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

export function getDropdownMenuContentStyleProps(options?: SlotStyleOptions) {
  return getMenuContentStyleProps(options);
}

export function getDropdownMenuItemStyleProps(options?: SlotStyleOptions) {
  return getMenuItemStyleProps(options);
}
