import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import {
  borderTokens,
  controlTokens,
  colorTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens,
  surfaceTokens
} from '../../theme/tokens.stylex';

export type SwitchSize = 'sm' | 'md';

interface GetSwitchStylePropsOptions {
  size: SwitchSize;
  checked: boolean;
  disabled: boolean;
  className?: string;
  style?: CSSProperties;
}

const switchStyles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: surfaceTokens.inset,
    borderColor: borderTokens.default,
    borderRadius: radiusTokens.pill,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    cursor: 'pointer',
    display: 'inline-flex',
    margin: 0,
    padding: spacingTokens.xxxs,
    position: 'relative'
  },
  checked: {
    backgroundColor: colorTokens.accent,
    borderColor: colorTokens.accent
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.6
  },
  sm: {
    height: spacingTokens.xl,
    width: spacingTokens.xxxl
  },
  md: {
    height: spacingTokens.xxl,
    width: spacingTokens.xxxxl
  },
  thumb: {
    backgroundColor: controlTokens.background,
    borderRadius: radiusTokens.pill,
    boxShadow: shadowTokens.controlThumb,
    display: 'block',
    transitionDuration: '120ms',
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease'
  },
  thumbSm: {
    height: spacingTokens.lg,
    width: spacingTokens.lg
  },
  thumbMd: {
    height: spacingTokens.xl,
    width: spacingTokens.xl
  },
  thumbCheckedSm: {
    transform: `translateX(${spacingTokens.lg})`
  },
  thumbCheckedMd: {
    transform: `translateX(${spacingTokens.xl})`
  }
});

const sizeStyles: Record<SwitchSize, unknown> = {
  sm: switchStyles.sm,
  md: switchStyles.md
};

const thumbSizeStyles: Record<SwitchSize, unknown> = {
  sm: switchStyles.thumbSm,
  md: switchStyles.thumbMd
};

const thumbCheckedStyles: Record<SwitchSize, unknown> = {
  sm: switchStyles.thumbCheckedSm,
  md: switchStyles.thumbCheckedMd
};

export function getSwitchRootStyleProps({
  size,
  checked,
  disabled,
  className,
  style
}: GetSwitchStylePropsOptions) {
  return composeStyleProps(
    [
      uiPrimitives.focusVisibleOutline,
      uiPrimitives.interactiveTransition,
      switchStyles.root,
      pickStyle(sizeStyles, size),
      checked && switchStyles.checked,
      disabled && switchStyles.disabled
    ],
    { className, style }
  );
}

export function getSwitchThumbStyleProps(size: SwitchSize, checked: boolean) {
  return composeStyleProps([
    switchStyles.thumb,
    pickStyle(thumbSizeStyles, size),
    checked && pickStyle(thumbCheckedStyles, size)
  ]);
}
