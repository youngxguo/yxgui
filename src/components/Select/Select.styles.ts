import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { getControlLikeStyleProps, type ControlLikeSize } from '../../styles/controlLike';
import { spacingTokens, typographyTokens } from '../../theme/tokens/foundationTokens.stylex';
import { componentSizeTokens } from '../../theme/tokens/componentTokens.stylex';

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
    paddingRight: componentSizeTokens.sizeMd
  },
  sm: {
    fontSize: typographyTokens.fontSizeSm,
    minHeight: componentSizeTokens.sizeMd,
    paddingBottom: spacingTokens.xxs,
    paddingLeft: spacingTokens.sm,
    paddingTop: spacingTokens.xxs
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: componentSizeTokens.sizeMd,
    paddingBottom: spacingTokens.xs,
    paddingLeft: spacingTokens.lg,
    paddingTop: spacingTokens.xs
  },
  lg: {
    fontSize: typographyTokens.fontSizeLg,
    minHeight: componentSizeTokens.sizeLg,
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
