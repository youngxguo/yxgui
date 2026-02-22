import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { stylexVars as vars } from '../../theme/stylexVars.stylex';

export type InputSize = 'sm' | 'md' | 'lg';

interface GetInputStylePropsOptions {
  size: InputSize;
  invalid: boolean;
  className?: string;
  style?: CSSProperties;
}

const inputStyles = stylex.create({
  root: {
    boxSizing: 'border-box'
  },
  text: {
    fontWeight: 400
  },
  placeholder: {
    '::placeholder': {
      color: vars.controlPlaceholder
    }
  },
  hover: {
    ':not(:disabled):hover': {
      borderColor: vars.borderStrong
    }
  },
  focusVisible: {
    ':focus-visible': {
      borderColor: vars.controlBorderFocus,
      outlineColor: vars.controlBorderFocus
    }
  },
  invalid: {
    borderColor: vars.componentsInputInvalidBorder
  },
  invalidFocusVisible: {
    ':focus-visible': {
      outlineColor: vars.componentsInputInvalidBorder
    }
  },
  sm: {
    fontSize: vars.typographyFontSizeSm,
    minHeight: '2rem',
    padding: '0.3rem 0.625rem'
  },
  md: {
    fontSize: vars.typographyFontSizeMd,
    minHeight: '2.25rem',
    padding: '0.375rem 0.75rem'
  },
  lg: {
    fontSize: vars.typographyFontSizeLg,
    minHeight: '2.5rem',
    padding: '0.5rem 0.875rem'
  }
});

const inputSizeStyles: Record<InputSize, unknown> = {
  sm: inputStyles.sm,
  md: inputStyles.md,
  lg: inputStyles.lg
};

export function getInputStyleProps({ size, invalid, className, style }: GetInputStylePropsOptions) {
  return composeStyleProps(
    [
      uiPrimitives.controlBase,
      uiPrimitives.focusVisibleRing,
      uiPrimitives.interactiveTransition,
      uiPrimitives.disabledCursor,
      uiPrimitives.disabledControlSurface,
      inputStyles.root,
      inputStyles.text,
      inputStyles.placeholder,
      inputStyles.hover,
      inputStyles.focusVisible,
      pickStyle(inputSizeStyles, size),
      invalid && inputStyles.invalid,
      invalid && inputStyles.invalidFocusVisible
    ],
    { className, style }
  );
}
