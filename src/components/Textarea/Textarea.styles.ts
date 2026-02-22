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

export type TextareaSize = 'sm' | 'md' | 'lg';

interface GetTextareaStylePropsOptions {
  size: TextareaSize;
  invalid: boolean;
  className?: string;
  style?: CSSProperties;
}

const textareaStyles = stylex.create({
  root: {
    boxSizing: 'border-box',
    minWidth: 0,
    resize: 'vertical'
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
    minHeight: '5rem',
    padding: `${spacingTokens.xs} ${spacingTokens.md}`
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: '6rem',
    padding: `${spacingTokens.half} ${spacingTokens.lg}`
  },
  lg: {
    fontSize: typographyTokens.fontSizeLg,
    minHeight: '7rem',
    padding: `${spacingTokens.sm} ${spacingTokens.xl}`
  }
});

const textareaSizeStyles: Record<TextareaSize, unknown> = {
  sm: textareaStyles.sm,
  md: textareaStyles.md,
  lg: textareaStyles.lg
};

export function getTextareaStyleProps({
  size,
  invalid,
  className,
  style
}: GetTextareaStylePropsOptions) {
  return composeStyleProps(
    [
      uiPrimitives.controlBase,
      uiPrimitives.focusVisibleRing,
      uiPrimitives.interactiveTransition,
      uiPrimitives.disabledCursor,
      uiPrimitives.disabledControlSurface,
      textareaStyles.root,
      textareaStyles.text,
      textareaStyles.placeholder,
      textareaStyles.hover,
      textareaStyles.focusVisible,
      pickStyle(textareaSizeStyles, size),
      invalid && textareaStyles.invalid,
      invalid && textareaStyles.invalidFocusVisible
    ],
    { className, style }
  );
}
