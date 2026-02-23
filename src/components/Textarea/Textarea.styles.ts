import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { getControlLikeStyleProps, type ControlLikeSize } from '../../styles/controlLike';
import { spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

export type TextareaSize = ControlLikeSize;

interface GetTextareaStylePropsOptions {
  size: TextareaSize;
  invalid: boolean;
  className?: string;
  style?: CSSProperties;
}

const textareaStyles = stylex.create({
  root: {
    minWidth: 0,
    resize: 'vertical'
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
  return getControlLikeStyleProps({
    size,
    sizeStyles: textareaSizeStyles,
    invalid,
    baseStyles: [textareaStyles.root],
    includeText: true,
    includePlaceholder: true,
    className,
    style
  });
}
