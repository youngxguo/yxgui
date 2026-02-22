import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { type ThemeCSSVariableRef } from '../../theme/vars.stylex';

const varComponentsButtonActiveOffset =
  'var(--yxgui-components-button-active-offset)' as ThemeCSSVariableRef;
const varComponentsButtonDisabledOpacity =
  'var(--yxgui-components-button-disabled-opacity)' as ThemeCSSVariableRef;
const varComponentsButtonMinHeightLg =
  'var(--yxgui-components-button-min-height-lg)' as ThemeCSSVariableRef;
const varComponentsButtonMinHeightMd =
  'var(--yxgui-components-button-min-height-md)' as ThemeCSSVariableRef;
const varComponentsButtonMinHeightSm =
  'var(--yxgui-components-button-min-height-sm)' as ThemeCSSVariableRef;
const varComponentsButtonPaddingLg =
  'var(--yxgui-components-button-padding-lg)' as ThemeCSSVariableRef;
const varComponentsButtonPaddingMd =
  'var(--yxgui-components-button-padding-md)' as ThemeCSSVariableRef;
const varComponentsButtonPaddingSm =
  'var(--yxgui-components-button-padding-sm)' as ThemeCSSVariableRef;
const varComponentsButtonPrimaryHoverShadow =
  'var(--yxgui-components-button-primary-hover-shadow)' as ThemeCSSVariableRef;
const varPaletteForeground = 'var(--yxgui-palette-foreground)' as ThemeCSSVariableRef;
const varRadiusPill = 'var(--yxgui-radius-pill)' as ThemeCSSVariableRef;
const varSpacingXs = 'var(--yxgui-spacing-xs)' as ThemeCSSVariableRef;
const varTypographyFontFamily = 'var(--yxgui-typography-font-family)' as ThemeCSSVariableRef;
const varTypographyFontSizeLg = 'var(--yxgui-typography-font-size-lg)' as ThemeCSSVariableRef;
const varTypographyFontSizeMd = 'var(--yxgui-typography-font-size-md)' as ThemeCSSVariableRef;
const varTypographyFontSizeSm = 'var(--yxgui-typography-font-size-sm)' as ThemeCSSVariableRef;
const varTypographyFontWeightStrong =
  'var(--yxgui-typography-font-weight-strong)' as ThemeCSSVariableRef;
const varTypographyLineHeightTight =
  'var(--yxgui-typography-line-height-tight)' as ThemeCSSVariableRef;
const varVariantsGhostForeground = 'var(--yxgui-variants-ghost-foreground)' as ThemeCSSVariableRef;
const varVariantsGhostHoverBackground =
  'var(--yxgui-variants-ghost-hover-background)' as ThemeCSSVariableRef;
const varVariantsPrimaryBackground =
  'var(--yxgui-variants-primary-background)' as ThemeCSSVariableRef;
const varVariantsPrimaryForeground =
  'var(--yxgui-variants-primary-foreground)' as ThemeCSSVariableRef;
const varVariantsSecondaryBackground =
  'var(--yxgui-variants-secondary-background)' as ThemeCSSVariableRef;
const varVariantsSecondaryBorder = 'var(--yxgui-variants-secondary-border)' as ThemeCSSVariableRef;
const varVariantsSecondaryForeground =
  'var(--yxgui-variants-secondary-foreground)' as ThemeCSSVariableRef;
const varVariantsSecondaryHoverBorder =
  'var(--yxgui-variants-secondary-hover-border)' as ThemeCSSVariableRef;

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
    borderRadius: varRadiusPill,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: varPaletteForeground,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: varTypographyFontFamily,
    fontWeight: varTypographyFontWeightStrong,
    gap: varSpacingXs,
    justifyContent: 'center',
    lineHeight: varTypographyLineHeightTight
  },
  disabled: {
    ':disabled': {
      opacity: varComponentsButtonDisabledOpacity
    }
  },
  active: {
    ':not(:disabled):active': {
      transform: `translateY(${varComponentsButtonActiveOffset})`
    }
  },
  primary: {
    backgroundColor: varVariantsPrimaryBackground,
    color: varVariantsPrimaryForeground
  },
  primaryHover: {
    ':not(:disabled):hover': {
      boxShadow: varComponentsButtonPrimaryHoverShadow
    }
  },
  secondary: {
    backgroundColor: varVariantsSecondaryBackground,
    borderColor: varVariantsSecondaryBorder,
    color: varVariantsSecondaryForeground
  },
  secondaryHover: {
    ':not(:disabled):hover': {
      borderColor: varVariantsSecondaryHoverBorder
    }
  },
  ghost: {
    backgroundColor: 'transparent',
    color: varVariantsGhostForeground
  },
  ghostHover: {
    ':not(:disabled):hover': {
      backgroundColor: varVariantsGhostHoverBackground
    }
  },
  sm: {
    fontSize: varTypographyFontSizeSm,
    minHeight: varComponentsButtonMinHeightSm,
    padding: varComponentsButtonPaddingSm
  },
  md: {
    fontSize: varTypographyFontSizeMd,
    minHeight: varComponentsButtonMinHeightMd,
    padding: varComponentsButtonPaddingMd
  },
  lg: {
    fontSize: varTypographyFontSizeLg,
    minHeight: varComponentsButtonMinHeightLg,
    padding: varComponentsButtonPaddingLg
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
