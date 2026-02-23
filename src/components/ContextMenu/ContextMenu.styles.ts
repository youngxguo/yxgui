import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { getMenuContentStyleProps, getMenuItemStyleProps } from '../../styles/menu';
import { borderTokens, spacingTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const contextMenuStyles = stylex.create({
  trigger: {
    display: 'inline-block',
    outline: 'none'
  },
  separator: {
    borderTop: `${borderTokens.widthThin} solid ${borderTokens.muted}`,
    margin: `${spacingTokens.xs} ${spacingTokens.xs}`
  }
});

export function getContextMenuTriggerStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([contextMenuStyles.trigger, uiPrimitives.focusVisibleOutline], options);
}

export function getContextMenuContentStyleProps(options?: SlotStyleOptions) {
  return getMenuContentStyleProps(options);
}

export function getContextMenuItemStyleProps(options?: SlotStyleOptions) {
  return getMenuItemStyleProps(options);
}

export function getContextMenuSeparatorStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([contextMenuStyles.separator], options);
}
