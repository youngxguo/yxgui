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
  surfaceTokens,
  typographyTokens,
  variantTokens
} from '../../theme/tokens.stylex';

export type ToggleVariant = 'primary' | 'secondary' | 'ghost';
export type ToggleSize = 'sm' | 'md' | 'lg';

interface GetToggleStylePropsOptions {
  variant: ToggleVariant;
  size: ToggleSize;
  pressed: boolean;
  disabled: boolean;
  className?: string;
  style?: CSSProperties;
}

const toggleStyles = stylex.create({
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
  primaryPressed: {
    boxShadow: 'inset 0 0 0 1px #4c4b45, 0 1px 1px #11110f'
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
  secondaryPressed: {
    backgroundColor: surfaceTokens.subtle,
    borderColor: borderTokens.strong
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
  ghostPressed: {
    backgroundColor: variantTokens.ghostHoverBackground,
    borderColor: variantTokens.outlineBorder
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

const toggleVariantStyles: Record<ToggleVariant, ReadonlyArray<unknown>> = {
  primary: [toggleStyles.primary, toggleStyles.primaryHover],
  secondary: [toggleStyles.secondary, toggleStyles.secondaryHover],
  ghost: [toggleStyles.ghost, toggleStyles.ghostHover]
};

const togglePressedVariantStyles: Record<ToggleVariant, ReadonlyArray<unknown>> = {
  primary: [toggleStyles.primaryPressed],
  secondary: [toggleStyles.secondaryPressed],
  ghost: [toggleStyles.ghostPressed]
};

const toggleSizeStyles: Record<ToggleSize, unknown> = {
  sm: toggleStyles.sm,
  md: toggleStyles.md,
  lg: toggleStyles.lg
};

export function getToggleStyleProps({
  variant,
  size,
  pressed,
  disabled,
  className,
  style
}: GetToggleStylePropsOptions) {
  return composeStyleProps(
    [
      toggleStyles.root,
      uiPrimitives.focusVisibleOutline,
      uiPrimitives.interactiveTransition,
      uiPrimitives.disabledCursor,
      toggleStyles.disabled,
      !disabled && toggleStyles.active,
      ...pickStyle(toggleVariantStyles, variant),
      ...(pressed ? pickStyle(togglePressedVariantStyles, variant) : []),
      pickStyle(toggleSizeStyles, size)
    ],
    { className, style }
  );
}
