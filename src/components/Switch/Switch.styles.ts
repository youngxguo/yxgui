import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { borderTokens, paletteTokens, radiusTokens } from '../../theme/tokens.stylex';

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
    backgroundColor: '#d9d8cf',
    borderColor: borderTokens.default,
    borderRadius: radiusTokens.pill,
    borderStyle: 'solid',
    borderWidth: '1px',
    cursor: 'pointer',
    display: 'inline-flex',
    margin: 0,
    padding: '2px',
    position: 'relative'
  },
  checked: {
    backgroundColor: paletteTokens.accent,
    borderColor: paletteTokens.accent
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.6
  },
  sm: {
    height: '1.2rem',
    width: '2rem'
  },
  md: {
    height: '1.45rem',
    width: '2.45rem'
  },
  thumb: {
    backgroundColor: '#ffffff',
    borderRadius: radiusTokens.pill,
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
    display: 'block',
    transitionDuration: '120ms',
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease'
  },
  thumbSm: {
    height: '0.8rem',
    width: '0.8rem'
  },
  thumbMd: {
    height: '1rem',
    width: '1rem'
  },
  thumbCheckedSm: {
    transform: 'translateX(0.8rem)'
  },
  thumbCheckedMd: {
    transform: 'translateX(1rem)'
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
      uiPrimitives.focusVisibleRing,
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
