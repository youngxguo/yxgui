import * as stylex from '@stylexjs/stylex';
import { floatingPrimitives } from './floating';
import { composeStyleProps, type StyleRecipeOverrides } from './recipes';
import { spacingTokens } from '../theme/tokens/foundationTokens.stylex';
import { componentSizeTokens } from '../theme/tokens/componentTokens.stylex';
import { borderTokens, colorTokens, surfaceTokens } from '../theme/tokens/semanticTokens.stylex';

// Shared menu surface/item recipes used by menu-like components (dropdown, context menu, etc.).
const menuStyles = stylex.create({
  content: {
    backgroundColor: surfaceTokens.base,
    borderColor: borderTokens.muted,
    display: 'grid',
    gap: 0,
    minWidth: componentSizeTokens.menuMinWidth,
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
    minHeight: componentSizeTokens.sizeMd,
    padding: `${spacingTokens.xs} ${spacingTokens.md}`,
    textAlign: 'left',
    width: '100%'
  },
  itemHover: {
    ':not(:disabled):hover': {
      backgroundColor: surfaceTokens.elevated
    }
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
export function getMenuContentStyleProps(
  options?: StyleRecipeOverrides,
  extraStyles: ReadonlyArray<unknown> = []
) {
  return composeStyleProps(
    [floatingPrimitives.floatingLayer, menuStyles.content, ...extraStyles],
    options
  );
}

/** Returns style props for interactive menu items, including hover, disabled, and focus-visible states. */
export function getMenuItemStyleProps(
  options?: StyleRecipeOverrides,
  extraStyles: ReadonlyArray<unknown> = [],
  includeFocusVisible = true
) {
  return composeStyleProps(
    [
      menuStyles.item,
      menuStyles.itemHover,
      menuStyles.itemDisabled,
      includeFocusVisible && menuStyles.itemFocusVisible,
      ...extraStyles
    ],
    options
  );
}
