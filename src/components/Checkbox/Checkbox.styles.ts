import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import {
  validationTokens,
  colorTokens,
  radiusTokens,
  spacingTokens
} from '../../theme/tokens.stylex';

export type CheckboxSize = 'sm' | 'md';

interface GetCheckboxStylePropsOptions {
  size: CheckboxSize;
  invalid: boolean;
  className?: string;
  style?: CSSProperties;
}

const checkboxStyles = stylex.create({
  root: {
    accentColor: colorTokens.accent,
    borderRadius: radiusTokens.sm,
    cursor: 'pointer',
    flexShrink: 0,
    margin: 0
  },
  invalid: {
    accentColor: validationTokens.invalidBorder
  },
  sm: {
    height: spacingTokens.lg,
    width: spacingTokens.lg
  },
  md: {
    height: spacingTokens.xl,
    width: spacingTokens.xl
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
      uiPrimitives.focusVisibleOutline,
      uiPrimitives.interactiveTransition,
      uiPrimitives.disabledCursor,
      checkboxStyles.root,
      pickStyle(checkboxSizeStyles, size),
      invalid && checkboxStyles.invalid
    ],
    { className, style }
  );
}
