import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { type ThemeCSSVariableRef } from '../../theme/vars.stylex';

const varBorderStrong = 'var(--yxgui-border-strong)' as ThemeCSSVariableRef;
const varComponentsInputInvalidBorder =
  'var(--yxgui-components-input-invalid-border)' as ThemeCSSVariableRef;
const varControlBorderFocus = 'var(--yxgui-control-border-focus)' as ThemeCSSVariableRef;
const varControlPlaceholder = 'var(--yxgui-control-placeholder)' as ThemeCSSVariableRef;
const varTypographyFontSizeLg = 'var(--yxgui-typography-font-size-lg)' as ThemeCSSVariableRef;
const varTypographyFontSizeMd = 'var(--yxgui-typography-font-size-md)' as ThemeCSSVariableRef;
const varTypographyFontSizeSm = 'var(--yxgui-typography-font-size-sm)' as ThemeCSSVariableRef;

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
      color: varControlPlaceholder
    }
  },
  hover: {
    ':not(:disabled):hover': {
      borderColor: varBorderStrong
    }
  },
  focusVisible: {
    ':focus-visible': {
      borderColor: varControlBorderFocus,
      outlineColor: varControlBorderFocus
    }
  },
  invalid: {
    borderColor: varComponentsInputInvalidBorder
  },
  invalidFocusVisible: {
    ':focus-visible': {
      outlineColor: varComponentsInputInvalidBorder
    }
  },
  sm: {
    fontSize: varTypographyFontSizeSm,
    minHeight: '2rem',
    padding: '0.3rem 0.625rem'
  },
  md: {
    fontSize: varTypographyFontSizeMd,
    minHeight: '2.25rem',
    padding: '0.375rem 0.75rem'
  },
  lg: {
    fontSize: varTypographyFontSizeLg,
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
