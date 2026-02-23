import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import {
  borderTokens,
  buttonTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
  variantTokens
} from '../../theme/tokens.stylex';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface GetButtonStylePropsOptions {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
  style?: CSSProperties;
}

const buttonStyles = stylex.create({
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
  focusVisible: {
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

const buttonVariantStyles: Record<ButtonVariant, ReadonlyArray<unknown>> = {
  primary: [buttonStyles.primary, buttonStyles.primaryHover],
  secondary: [buttonStyles.secondary, buttonStyles.secondaryHover],
  ghost: [buttonStyles.ghost, buttonStyles.ghostHover]
};

const buttonSizeStyles: Record<ButtonSize, unknown> = {
  sm: buttonStyles.sm,
  md: buttonStyles.md,
  lg: buttonStyles.lg
};

export function getButtonStyleProps({
  variant,
  size,
  className,
  style
}: GetButtonStylePropsOptions) {
  return composeStyleProps(
    [
      buttonStyles.root,
      buttonStyles.focusVisible,
      uiPrimitives.interactiveTransition,
      uiPrimitives.disabledCursor,
      buttonStyles.disabled,
      buttonStyles.active,
      ...pickStyle(buttonVariantStyles, variant),
      pickStyle(buttonSizeStyles, size)
    ],
    { className, style }
  );
}
