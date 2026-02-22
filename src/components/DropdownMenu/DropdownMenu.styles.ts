import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import {
  borderTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const menuStyles = stylex.create({
  content: {
    backgroundColor: surfaceTokens.elevated,
    border: `1px solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    boxShadow: '0 8px 20px rgba(22,22,20,0.14)',
    display: 'grid',
    gap: '0.2rem',
    minWidth: '12rem',
    padding: '0.25rem',
    position: 'fixed',
    zIndex: 1000
  },
  item: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: radiusTokens.sm,
    color: paletteTokens.foreground,
    cursor: 'pointer',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.2',
    padding: `0.45rem ${spacingTokens.md}`,
    textAlign: 'left',
    width: '100%'
  },
  itemHover: {
    ':hover': {
      backgroundColor: '#f1f0ea'
    }
  },
  itemFocusVisible: {
    ':focus-visible': {
      backgroundColor: '#e9eefc',
      outline: 'none'
    }
  },
  itemDisabled: {
    color: paletteTokens.mutedForeground,
    cursor: 'not-allowed',
    opacity: 0.65
  }
});

export function getDropdownMenuContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([menuStyles.content], options);
}

export function getDropdownMenuItemStyleProps(disabled: boolean, options?: SlotStyleOptions) {
  return composeStyleProps(
    [
      menuStyles.item,
      !disabled && menuStyles.itemHover,
      !disabled && menuStyles.itemFocusVisible,
      disabled && menuStyles.itemDisabled
    ],
    options
  );
}
