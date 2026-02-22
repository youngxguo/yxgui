import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { inputTokens, paletteTokens, radiusTokens } from '../../theme/tokens.stylex';

export type CheckboxSize = 'sm' | 'md';

interface GetCheckboxStylePropsOptions {
  size: CheckboxSize;
  invalid: boolean;
  className?: string;
  style?: CSSProperties;
}

const checkboxStyles = stylex.create({
  root: {
    accentColor: paletteTokens.accent,
    borderRadius: radiusTokens.sm,
    cursor: 'pointer',
    flexShrink: 0,
    margin: 0
  },
  invalid: {
    accentColor: inputTokens.invalidBorder
  },
  sm: {
    height: '0.95rem',
    width: '0.95rem'
  },
  md: {
    height: '1.05rem',
    width: '1.05rem'
  }
});

const checkboxSizeStyles: Record<CheckboxSize, unknown> = {
  sm: checkboxStyles.sm,
  md: checkboxStyles.md
};

export function getCheckboxStyleProps({
  size,
  invalid,
  className,
  style
}: GetCheckboxStylePropsOptions) {
  return composeStyleProps(
    [
      uiPrimitives.focusVisibleRing,
      uiPrimitives.interactiveTransition,
      uiPrimitives.disabledCursor,
      checkboxStyles.root,
      pickStyle(checkboxSizeStyles, size),
      invalid && checkboxStyles.invalid
    ],
    { className, style }
  );
}
