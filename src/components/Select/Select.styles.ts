import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { getControlLikeStyleProps, type ControlLikeSize } from '../../styles/controlLike';
import { spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

export type SelectSize = ControlLikeSize;

interface GetSelectStylePropsOptions {
  size: SelectSize;
  invalid: boolean;
  className?: string;
  style?: CSSProperties;
}

const selectStyles = stylex.create({
  root: {
    cursor: 'pointer',
    paddingRight: spacingTokens.xxxl
  },
  sm: {
    fontSize: typographyTokens.fontSizeSm,
    minHeight: spacingTokens.xxxl,
    paddingBottom: spacingTokens.xxs,
    paddingLeft: spacingTokens.half,
    paddingTop: spacingTokens.xxs
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: spacingTokens.xxxl,
    paddingBottom: spacingTokens.xs,
    paddingLeft: spacingTokens.lg,
    paddingTop: spacingTokens.xs
  },
  lg: {
    fontSize: typographyTokens.fontSizeLg,
    minHeight: spacingTokens.xxxxl,
    paddingBottom: spacingTokens.sm,
    paddingLeft: spacingTokens.xl,
    paddingTop: spacingTokens.sm
  }
});

const selectSizeStyles: Record<SelectSize, unknown> = {
  sm: selectStyles.sm,
  md: selectStyles.md,
  lg: selectStyles.lg
};

export function getSelectStyleProps({
  size,
  invalid,
  className,
  style
}: GetSelectStylePropsOptions) {
  return getControlLikeStyleProps({
    size,
    sizeStyles: selectSizeStyles,
    invalid,
    baseStyles: [selectStyles.root],
    className,
    style
  });
}
