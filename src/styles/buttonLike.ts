import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from './recipes';
import { uiPrimitives } from './primitives';
import {
  borderTokens,
  buttonTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
  variantTokens
} from '../theme/tokens.stylex';

export type ButtonLikeVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonLikeSize = 'sm' | 'md' | 'lg';
export type ButtonLikeFocusRing = 'default' | 'menuitemSafe';

interface GetButtonLikeStylePropsOptions {
  variant: ButtonLikeVariant;
  size: ButtonLikeSize;
  disabled?: boolean;
  focusRing?: ButtonLikeFocusRing;
  extraStyles?: ReadonlyArray<unknown>;
  className?: string;
  style?: CSSProperties;
}

const buttonLikeStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: radiusTokens.md,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    color: paletteTokens.foreground,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: typographyTokens.fontFamily,
    fontWeight: typographyTokens.fontWeightMedium,
    gap: spacingTokens.xs,
    justifyContent: 'center',
    lineHeight: typographyTokens.lineHeightTight
  },
  focusVisibleMenuitemSafe: {
    ':focus-visible:not([role="menuitem"])': {
      outlineColor: borderTokens.focus,
      outlineOffset: spacingTokens.xxxs,
      outlineStyle: 'solid',
      outlineWidth: spacingTokens.xxxs
    }
  },
  disabled: {
    ':disabled': {
      backgroundColor: buttonTokens.disabledBackground,
      borderColor: buttonTokens.disabledBorder,
      boxShadow: 'none',
      color: buttonTokens.disabledForeground
    }
  },
  active: {
    ':not(:disabled):active': {
      transform: `translateY(${buttonTokens.activeOffset})`
    }
  },
  primary: {
    backgroundColor: variantTokens.primaryBackground,
    boxShadow: buttonTokens.primaryShadow,
    color: variantTokens.primaryForeground
  },
  primaryHover: {
    ':not(:disabled):hover': {
      boxShadow: buttonTokens.primaryHoverShadow
    }
  },
  secondary: {
    backgroundColor: variantTokens.secondaryBackground,
    borderColor: variantTokens.secondaryBorder,
    color: variantTokens.secondaryForeground
  },
  secondaryHover: {
    ':not(:disabled):hover': {
      borderColor: variantTokens.secondaryHoverBorder
    }
  },
  ghost: {
    backgroundColor: 'transparent',
    color: variantTokens.ghostForeground
  },
  ghostHover: {
    ':not(:disabled):hover': {
      backgroundColor: variantTokens.ghostHoverBackground
    }
  },
  destructive: {
    backgroundColor: variantTokens.destructiveBackground,
    borderColor: variantTokens.destructiveBorder,
    boxShadow: buttonTokens.primaryShadow,
    color: variantTokens.destructiveForeground
  },
  destructiveHover: {
    ':not(:disabled):hover': {
      boxShadow: buttonTokens.primaryHoverShadow
    }
  },
  sm: {
    fontSize: typographyTokens.fontSizeSm,
    minHeight: spacingTokens.xxxl,
    padding: `${spacingTokens.xxs} ${spacingTokens.half}`
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: spacingTokens.xxxl,
    padding: `${spacingTokens.xs} ${spacingTokens.lg}`
  },
  lg: {
    fontSize: typographyTokens.fontSizeLg,
    minHeight: spacingTokens.xxxxl,
    padding: `${spacingTokens.half} ${spacingTokens.xl}`
  }
});

const buttonLikeVariantStyles: Record<ButtonLikeVariant, ReadonlyArray<unknown>> = {
  primary: [buttonLikeStyles.primary, buttonLikeStyles.primaryHover],
  secondary: [buttonLikeStyles.secondary, buttonLikeStyles.secondaryHover],
  ghost: [buttonLikeStyles.ghost, buttonLikeStyles.ghostHover],
  destructive: [buttonLikeStyles.destructive, buttonLikeStyles.destructiveHover]
};

const buttonLikeSizeStyles: Record<ButtonLikeSize, unknown> = {
  sm: buttonLikeStyles.sm,
  md: buttonLikeStyles.md,
  lg: buttonLikeStyles.lg
};

const buttonLikeFocusRingStyles: Record<ButtonLikeFocusRing, unknown> = {
  default: uiPrimitives.focusVisibleOutline,
  menuitemSafe: buttonLikeStyles.focusVisibleMenuitemSafe
};

export function getButtonLikeStyleProps({
  variant,
  size,
  disabled = false,
  focusRing = 'default',
  extraStyles = [],
  className,
  style
}: GetButtonLikeStylePropsOptions) {
  return composeStyleProps(
    [
      buttonLikeStyles.root,
      pickStyle(buttonLikeFocusRingStyles, focusRing),
      uiPrimitives.interactiveTransition,
      uiPrimitives.disabledCursor,
      buttonLikeStyles.disabled,
      !disabled && buttonLikeStyles.active,
      ...pickStyle(buttonLikeVariantStyles, variant),
      ...extraStyles,
      pickStyle(buttonLikeSizeStyles, size)
    ],
    { className, style }
  );
}
