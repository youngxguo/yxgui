import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
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
  triggerFocusVisible: {
    ':focus-visible': {
      outlineColor: borderTokens.focus,
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineWidth: '2px'
    }
  },
  separator: {
    borderTop: `1px solid ${borderTokens.muted}`,
    margin: `${spacingTokens.xs} ${spacingTokens.xs}`
  }
});

export function getContextMenuTriggerStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps(
    [contextMenuStyles.trigger, contextMenuStyles.triggerFocusVisible],
    options
  );
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
