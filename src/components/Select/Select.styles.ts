import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import {
  borderTokens,
  controlTokens,
  inputTokens,
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
    paddingRight: '2rem'
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
    minHeight: '2rem',
    paddingBottom: '0.3rem',
    paddingLeft: '0.625rem',
    paddingTop: '0.3rem'
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: '2.25rem',
    paddingBottom: '0.375rem',
    paddingLeft: '0.75rem',
    paddingTop: '0.375rem'
  },
  lg: {
    fontSize: typographyTokens.fontSizeLg,
    minHeight: '2.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.875rem',
    paddingTop: '0.5rem'
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
      uiPrimitives.focusVisibleRing,
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
