import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { stylexVars as vars } from '../../theme/stylexVars.stylex';

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
    borderRadius: vars.radiusMd,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: vars.paletteForeground,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: vars.typographyFontFamily,
    fontWeight: vars.typographyFontWeightStrong,
    gap: vars.spacingXs,
    justifyContent: 'center',
    lineHeight: vars.typographyLineHeightTight
  },
  disabled: {
    ':disabled': {
      opacity: vars.componentsButtonDisabledOpacity
    }
  },
  active: {
    ':not(:disabled):active': {
      transform: `translateY(${vars.componentsButtonActiveOffset})`
    }
  },
  primary: {
    backgroundColor: vars.variantsPrimaryBackground,
    color: vars.variantsPrimaryForeground
  },
  primaryHover: {
    ':not(:disabled):hover': {
      boxShadow: vars.componentsButtonPrimaryHoverShadow
    }
  },
  secondary: {
    backgroundColor: vars.variantsSecondaryBackground,
    borderColor: vars.variantsSecondaryBorder,
    color: vars.variantsSecondaryForeground
  },
  secondaryHover: {
    ':not(:disabled):hover': {
      borderColor: vars.variantsSecondaryHoverBorder
    }
  },
  ghost: {
    backgroundColor: 'transparent',
    color: vars.variantsGhostForeground
  },
  ghostHover: {
    ':not(:disabled):hover': {
      backgroundColor: vars.variantsGhostHoverBackground
    }
  },
  sm: {
    fontSize: vars.typographyFontSizeSm,
    minHeight: vars.componentsButtonMinHeightSm,
    padding: vars.componentsButtonPaddingSm
  },
  md: {
    fontSize: vars.typographyFontSizeMd,
    minHeight: vars.componentsButtonMinHeightMd,
    padding: vars.componentsButtonPaddingMd
  },
  lg: {
    fontSize: vars.typographyFontSizeLg,
    minHeight: vars.componentsButtonMinHeightLg,
    padding: vars.componentsButtonPaddingLg
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
      uiPrimitives.focusVisibleRing,
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
