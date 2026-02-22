import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import {
  borderTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens,
  paletteTokens
} from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const menubarStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: surfaceTokens.elevated,
    border: `1px solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    display: 'inline-flex',
    gap: 0,
    padding: spacingTokens.xxs
  },
  trigger: {
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: radiusTokens.sm,
    color: paletteTokens.foreground,
    cursor: 'pointer',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    minHeight: '2rem',
    padding: `0 ${spacingTokens.sm}`
  },
  triggerHover: {
    ':hover': {
      backgroundColor: surfaceTokens.subtle
    }
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
    margin: `${spacingTokens.xs} 0`
  }
});

export function getMenubarRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([menubarStyles.root], options);
}

export function getMenubarTriggerStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps(
    [menubarStyles.trigger, menubarStyles.triggerHover, menubarStyles.triggerFocusVisible],
    options
  );
}

export function getMenubarSeparatorStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([menubarStyles.separator], options);
}
