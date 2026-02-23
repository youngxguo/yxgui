import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  borderTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens,
  paletteTokens
} from '../../theme/tokens.stylex';

const menubarStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: surfaceTokens.base,
    border: `${borderTokens.widthThin} solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    display: 'inline-flex',
    gap: 0,
    padding: spacingTokens.xxs
  },
  trigger: {
    backgroundColor: 'transparent',
    border: `${borderTokens.widthThin} solid transparent`,
    borderRadius: radiusTokens.sm,
    color: paletteTokens.foreground,
    cursor: 'pointer',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    minHeight: spacingTokens.xxxl,
    padding: `0 ${spacingTokens.sm}`
  },
  triggerHover: {
    ':hover': {
      backgroundColor: surfaceTokens.subtle
    }
  },
  triggerFocusVisible: {
    ':focus-visible': {
      backgroundColor: surfaceTokens.subtle,
      outline: 'none'
    }
  },
  separator: {
    borderTop: `${borderTokens.widthThin} solid ${borderTokens.muted}`,
    margin: `${spacingTokens.xs} 0`
  }
});

export function getMenubarRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([menubarStyles.root], options);
}

export function getMenubarTriggerStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps(
    [menubarStyles.trigger, menubarStyles.triggerHover, menubarStyles.triggerFocusVisible],
    options
  );
}

export function getMenubarSeparatorStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([menubarStyles.separator], options);
}
