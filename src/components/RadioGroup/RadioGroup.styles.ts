import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { paletteTokens, spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

export type RadioGroupOrientation = 'vertical' | 'horizontal';
export type RadioSize = 'sm' | 'md';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const radioStyles = stylex.create({
  group: {
    display: 'grid',
    gap: spacingTokens.sm
  },
  horizontal: {
    alignItems: 'center',
    columnGap: spacingTokens.lg,
    gridAutoFlow: 'column',
    justifyContent: 'flex-start'
  },
  itemLabel: {
    alignItems: 'center',
    color: paletteTokens.foreground,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: typographyTokens.fontFamily,
    gap: spacingTokens.sm,
    lineHeight: '1.2'
  },
  itemLabelDisabled: {
    cursor: 'not-allowed',
    opacity: 0.6
  },
  input: {
    accentColor: paletteTokens.accent,
    margin: 0
  },
  inputSm: {
    height: spacingTokens.lg,
    width: spacingTokens.lg
  },
  inputMd: {
    height: spacingTokens.xl,
    width: spacingTokens.xl
  },
  textSm: {
    fontSize: typographyTokens.fontSizeSm
  },
  textMd: {
    fontSize: typographyTokens.fontSizeMd
  }
});

const orientationStyles: Record<RadioGroupOrientation, unknown> = {
  vertical: null,
  horizontal: radioStyles.horizontal
};

const inputSizeStyles: Record<RadioSize, unknown> = {
  sm: radioStyles.inputSm,
  md: radioStyles.inputMd
};

const textSizeStyles: Record<RadioSize, unknown> = {
  sm: radioStyles.textSm,
  md: radioStyles.textMd
};

export function getRadioGroupStyleProps(
  orientation: RadioGroupOrientation,
  options?: SlotStyleOptions
) {
  return composeStyleProps([radioStyles.group, pickStyle(orientationStyles, orientation)], options);
}

export function getRadioLabelStyleProps(disabled: boolean, options?: SlotStyleOptions) {
  return composeStyleProps(
    [radioStyles.itemLabel, disabled && radioStyles.itemLabelDisabled],
    options
  );
}

export function getRadioInputStyleProps(size: RadioSize, options?: SlotStyleOptions) {
  return composeStyleProps(
    [uiPrimitives.focusVisibleRing, radioStyles.input, pickStyle(inputSizeStyles, size)],
    options
  );
}

export function getRadioTextStyleProps(size: RadioSize, options?: SlotStyleOptions) {
  return composeStyleProps([pickStyle(textSizeStyles, size)], options);
}
