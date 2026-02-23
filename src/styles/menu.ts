import * as stylex from '@stylexjs/stylex';
import { floatingPrimitives } from './floating';
import { composeStyleProps, type StyleRecipeOverrides } from './recipes';
import { borderTokens, colorTokens, spacingTokens, surfaceTokens } from '../theme/tokens.stylex';

// Shared menu surface/item recipes used by menu-like components (dropdown, context menu, etc.).
const menuStyles = stylex.create({
  content: {
    backgroundColor: surfaceTokens.base,
    borderColor: borderTokens.muted,
    display: 'grid',
    gap: 0,
    minWidth: '10.75rem',
    overflow: 'hidden',
    padding: `${spacingTokens.xxs} 0`
  },
  item: {
    appearance: 'none',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 0,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colorTokens.foreground,
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
      color: colorTokens.mutedForeground
    }
  },
  itemFocusVisible: {
    ':focus-visible': {
      backgroundColor: surfaceTokens.accentSubtle,
      outline: 'none'
    }
  }
});

/** Returns style props for floating menu content surfaces. */
export function getMenuContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([floatingPrimitives.floatingLayer, menuStyles.content], options);
}

/** Returns style props for interactive menu items, including disabled and focus-visible states. */
export function getMenuItemStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps(
    [menuStyles.item, menuStyles.itemDisabled, menuStyles.itemFocusVisible],
    options
  );
}
