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
      color: controlTokens.placeholder
    }
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
    padding: '0.3rem 0.625rem'
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: '2.25rem',
    padding: '0.375rem 0.75rem'
  },
  lg: {
    fontSize: typographyTokens.fontSizeLg,
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
