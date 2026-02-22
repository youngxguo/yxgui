import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from './recipes';
import { borderTokens, paletteTokens, spacingTokens, surfaceTokens } from '../theme/tokens.stylex';

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
    appearance: 'none',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: paletteTokens.foreground,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: '2rem',
    padding: `${spacingTokens.xs} ${spacingTokens.md}`,
    textAlign: 'left',
    width: '100%'
  },
  itemDisabled: {
    ':disabled': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: paletteTokens.mutedForeground
    }
  },
  itemFocusVisible: {
    ':focus-visible': {
      backgroundColor: surfaceTokens.accentSubtle,
      outline: 'none'
    }
  }
});

export function getMenuContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([menuStyles.content], options);
}

export function getMenuItemStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps(
    [menuStyles.item, menuStyles.itemDisabled, menuStyles.itemFocusVisible],
    options
  );
}
