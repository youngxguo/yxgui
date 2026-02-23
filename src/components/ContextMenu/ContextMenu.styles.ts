import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { getMenuContentStyleProps, getMenuItemStyleProps } from '../../styles/menu';
import { spacingTokens } from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens } from '../../theme/tokens/semanticTokens.stylex';

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

export function getContextMenuTriggerStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([contextMenuStyles.trigger, uiPrimitives.focusVisibleOutline], options);
}

export function getContextMenuContentStyleProps(options?: StyleRecipeOverrides) {
  return getMenuContentStyleProps(options);
}

export function getContextMenuItemStyleProps(options?: StyleRecipeOverrides) {
  return getMenuItemStyleProps(options);
}

export function getContextMenuSeparatorStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([contextMenuStyles.separator], options);
}
