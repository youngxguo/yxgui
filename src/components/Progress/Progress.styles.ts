import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { borderTokens, paletteTokens, radiusTokens } from '../../theme/tokens.stylex';

export type ProgressSize = 'sm' | 'md' | 'lg';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const progressStyles = stylex.create({
  root: {
    backgroundColor: '#ecebe4',
    borderColor: borderTokens.muted,
    borderRadius: radiusTokens.pill,
    borderStyle: 'solid',
    borderWidth: '1px',
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  sm: { height: '0.375rem' },
  md: { height: '0.5rem' },
  lg: { height: '0.75rem' },
  indicator: {
    backgroundColor: paletteTokens.accent,
    borderRadius: radiusTokens.pill,
    height: '100%',
    transitionDuration: '160ms',
    transitionProperty: 'width',
    transitionTimingFunction: 'ease'
  }
});

const sizeStyles: Record<ProgressSize, unknown> = {
  sm: progressStyles.sm,
  md: progressStyles.md,
  lg: progressStyles.lg
};

export function getProgressRootStyleProps(size: ProgressSize, options?: SlotStyleOptions) {
  return composeStyleProps([progressStyles.root, pickStyle(sizeStyles, size)], options);
}

export function getProgressIndicatorStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([progressStyles.indicator], options);
}
