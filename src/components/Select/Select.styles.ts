import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import {
  borderTokens,
  controlTokens,
  inputTokens,
  spacingTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

export type SelectSize = 'sm' | 'md' | 'lg';

interface GetSelectStylePropsOptions {
  size: SelectSize;
  invalid: boolean;
  className?: string;
  style?: CSSProperties;
}

const selectStyles = stylex.create({
  root: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    paddingRight: spacingTokens.xxxl
  },
  hover: {
    ':not(:disabled):hover': {
      borderColor: borderTokens.strong
    }
  },
  focusVisible: {
    ':focus-visible': {
      borderColor: controlTokens.borderFocus,
      outlineColor: controlTokens.borderFocus
    }
  },
  invalid: {
    borderColor: inputTokens.invalidBorder
  },
  invalidFocusVisible: {
    ':focus-visible': {
      outlineColor: inputTokens.invalidBorder
    }
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
  return composeStyleProps(
    [
      uiPrimitives.controlBase,
      uiPrimitives.focusVisibleOutline,
      uiPrimitives.interactiveTransition,
      uiPrimitives.disabledCursor,
      uiPrimitives.disabledControlSurface,
      selectStyles.root,
      selectStyles.hover,
      selectStyles.focusVisible,
      pickStyle(selectSizeStyles, size),
      invalid && selectStyles.invalid,
      invalid && selectStyles.invalidFocusVisible
    ],
    { className, style }
  );
}
