import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { borderTokens, spacingTokens, surfaceTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const menuStyles = stylex.create({
  content: {
    backgroundColor: surfaceTokens.base,
    borderColor: borderTokens.muted,
    display: 'grid',
    gap: 0,
    minWidth: '10.75rem',
    overflow: 'hidden',
    padding: `${spacingTokens.xxs} 0`,
    position: 'fixed',
    zIndex: 1000
  },
  item: {
    alignItems: 'center',
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: '2rem',
    padding: `${spacingTokens.xs} ${spacingTokens.md}`,
    width: '100%'
  },
  itemFocusVisible: {
    ':focus-visible': {
      backgroundColor: surfaceTokens.accentSubtle,
      outline: 'none'
    }
  }
});

export function getDropdownMenuContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([menuStyles.content], options);
}

export function getDropdownMenuItemStyleProps(_disabled: boolean, options?: SlotStyleOptions) {
  return composeStyleProps([menuStyles.item, menuStyles.itemFocusVisible], options);
}
