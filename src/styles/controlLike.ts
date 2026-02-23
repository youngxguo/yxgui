import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from './recipes';
import { uiPrimitives } from './primitives';
import { borderTokens, controlTokens, validationTokens } from '../theme/tokens.stylex';

export type ControlLikeSize = 'sm' | 'md' | 'lg';

interface GetControlLikeStylePropsOptions {
  size: ControlLikeSize;
  sizeStyles: Record<ControlLikeSize, unknown>;
  invalid: boolean;
  baseStyles?: ReadonlyArray<unknown>;
  includeText?: boolean;
  includePlaceholder?: boolean;
  className?: string;
  style?: CSSProperties;
}

const controlLikeStyles = stylex.create({
  boxSizing: {
    boxSizing: 'border-box'
  },
  textRegular: {
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
    borderColor: validationTokens.invalidBorder
  },
  invalidFocusVisible: {
    ':focus-visible': {
      outlineColor: validationTokens.invalidBorder
    }
  }
});

export function getControlLikeStyleProps({
  size,
  sizeStyles,
  invalid,
  baseStyles = [],
  includeText = false,
  includePlaceholder = false,
  className,
  style
}: GetControlLikeStylePropsOptions) {
  return composeStyleProps(
    [
      uiPrimitives.controlBase,
      uiPrimitives.focusVisibleOutline,
      uiPrimitives.interactiveTransition,
      uiPrimitives.disabledCursor,
      uiPrimitives.disabledControlSurface,
      controlLikeStyles.boxSizing,
      ...baseStyles,
      includeText && controlLikeStyles.textRegular,
      includePlaceholder && controlLikeStyles.placeholder,
      controlLikeStyles.hover,
      controlLikeStyles.focusVisible,
      pickStyle(sizeStyles, size),
      invalid && controlLikeStyles.invalid,
      invalid && controlLikeStyles.invalidFocusVisible
    ],
    { className, style }
  );
}
