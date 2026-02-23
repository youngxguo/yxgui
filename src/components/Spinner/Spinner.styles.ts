import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { colorTokens, spacingTokens } from '../../theme/tokens.stylex';

export type SpinnerSize = 'sm' | 'md' | 'lg';

interface GetSpinnerRootStylePropsOptions {
  size: SpinnerSize;
  className?: string;
  style?: CSSProperties;
}

const spinnerStyles = stylex.create({
  root: {
    alignItems: 'center',
    color: colorTokens.accent,
    display: 'inline-flex',
    flexShrink: 0,
    justifyContent: 'center',
    lineHeight: 0
  },
  sm: {
    height: spacingTokens.xl,
    width: spacingTokens.xl
  },
  md: {
    height: spacingTokens.xxl,
    width: spacingTokens.xxl
  },
  lg: {
    height: spacingTokens.xxxl,
    width: spacingTokens.xxxl
  },
  svg: {
    display: 'block',
    height: '100%',
    width: '100%'
  }
});

const sizeStyles: Record<SpinnerSize, unknown> = {
  sm: spinnerStyles.sm,
  md: spinnerStyles.md,
  lg: spinnerStyles.lg
};

export function getSpinnerRootStyleProps({
  size,
  className,
  style
}: GetSpinnerRootStylePropsOptions) {
  return composeStyleProps([spinnerStyles.root, pickStyle(sizeStyles, size)], { className, style });
}

export function getSpinnerSvgStyleProps() {
  return composeStyleProps([spinnerStyles.svg]);
}
