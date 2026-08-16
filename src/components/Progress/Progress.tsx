import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { radii } from '../../theme/foundations.stylex';

export type ProgressProps = Omit<
  ComponentProps<'div'>,
  'aria-valuemax' | 'aria-valuemin' | 'aria-valuenow' | 'children' | 'className' | 'role' | 'style'
> & {
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  value?: number;
};

const slide = stylex.keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(250%)' }
});

const styles = stylex.create({
  root: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.full,
    overflow: 'hidden',
    width: '100%'
  },
  sm: { height: '4px' },
  md: { height: '8px' },
  lg: { height: '12px' },
  indicator: {
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    height: '100%',
    transitionDuration: '160ms',
    transitionProperty: 'width',
    transitionTimingFunction: 'ease-out'
  },
  indeterminate: {
    animationDuration: '1.2s',
    animationIterationCount: 'infinite',
    animationName: {
      default: slide,
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    animationTimingFunction: 'ease-in-out',
    width: '40%'
  }
});

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Progress({ max = 100, size = 'md', value, ...props }: ProgressProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = value === undefined ? undefined : clamp(value, 0, safeMax);
  const width = safeValue === undefined ? undefined : `${(safeValue / safeMax) * 100}%`;

  return (
    <div
      {...props}
      aria-valuemax={safeMax}
      aria-valuemin={0}
      aria-valuenow={safeValue}
      data-state={safeValue === undefined ? 'indeterminate' : 'determinate'}
      role="progressbar"
      {...stylex.props(styles.root, styles[size])}
    >
      <div
        aria-hidden="true"
        {...stylex.props(styles.indicator, safeValue === undefined && styles.indeterminate)}
        style={{ width }}
      />
    </div>
  );
}
