import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { getControlLikeStyleProps, type ControlLikeSize } from '../../styles/controlLike';
import { spacingTokens, typographyTokens } from '../../theme/tokens/foundationTokens.stylex';

export type InputSize = ControlLikeSize;

interface GetInputStylePropsOptions {
  size: InputSize;
  invalid: boolean;
  className?: string;
  style?: CSSProperties;
}

const inputStyles = stylex.create({
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

const inputSizeStyles: Record<InputSize, unknown> = {
  sm: inputStyles.sm,
  md: inputStyles.md,
  lg: inputStyles.lg
};

export function getInputStyleProps({ size, invalid, className, style }: GetInputStylePropsOptions) {
  return getControlLikeStyleProps({
    size,
    sizeStyles: inputSizeStyles,
    invalid,
    includeText: true,
    includePlaceholder: true,
    className,
    style
  });
}
