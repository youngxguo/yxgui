import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { pickStyle } from '../../styles/recipes';
import { getButtonLikeStyleProps, type ButtonLikeSize } from '../../styles/buttonLike';
import {
  borderTokens,
  buttonInteractionTokens,
  surfaceTokens,
  buttonVariantTokens
} from '../../theme/tokens.stylex';

export type ToggleVariant = 'primary' | 'secondary' | 'ghost';
export type ToggleSize = ButtonLikeSize;

interface GetToggleStylePropsOptions {
  variant: ToggleVariant;
  size: ToggleSize;
  pressed: boolean;
  disabled: boolean;
  className?: string;
  style?: CSSProperties;
}

const toggleStyles = stylex.create({
  primaryPressed: {
    boxShadow: buttonInteractionTokens.primaryPressedShadow
  },
  secondaryPressed: {
    backgroundColor: surfaceTokens.subtle,
    borderColor: borderTokens.strong
  },
  ghostPressed: {
    backgroundColor: buttonVariantTokens.ghostHoverBackground,
    borderColor: buttonVariantTokens.outlineBorder
  }
});

const togglePressedVariantStyles: Record<ToggleVariant, unknown> = {
  primary: toggleStyles.primaryPressed,
  secondary: toggleStyles.secondaryPressed,
  ghost: toggleStyles.ghostPressed
};

export function getToggleStyleProps({
  variant,
  size,
  pressed,
  disabled,
  className,
  style
}: GetToggleStylePropsOptions) {
  return getButtonLikeStyleProps({
    variant,
    size,
    disabled,
    extraStyles: pressed ? [pickStyle(togglePressedVariantStyles, variant)] : [],
    className,
    style
  });
}
