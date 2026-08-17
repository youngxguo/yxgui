import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, fontWeights, radii } from '../../theme/foundations.stylex';

export type ProgressProps = Omit<
  ComponentProps<'div'>,
  'aria-valuemax' | 'aria-valuemin' | 'aria-valuenow' | 'children' | 'className' | 'role' | 'style'
> & {
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  value?: number;
};
export type CircularProgressProps = Omit<
  ComponentProps<'span'>,
  'aria-valuemax' | 'aria-valuemin' | 'aria-valuenow' | 'children' | 'className' | 'role' | 'style'
> & {
  max?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  value?: number;
};

const slide = stylex.keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(250%)' }
});
const spin = stylex.keyframes({ to: { transform: 'rotate(360deg)' } });

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
  },
  circularRoot: {
    color: colors.text,
    display: 'inline-grid',
    flexShrink: 0,
    placeItems: 'center'
  },
  circularSm: { height: '24px', width: '24px' },
  circularMd: { height: '32px', width: '32px' },
  circularLg: { height: '40px', width: '40px' },
  circularSvg: {
    display: 'block',
    gridArea: '1 / 1',
    height: '100%',
    transform: 'rotate(-90deg)',
    width: '100%'
  },
  circularIndeterminate: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationName: {
      default: spin,
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    animationTimingFunction: 'linear'
  },
  track: { fill: 'none', stroke: colors.surfaceSubtle },
  circularIndicator: {
    fill: 'none',
    stroke: colors.primary,
    strokeLinecap: 'round',
    transitionDuration: '160ms',
    transitionProperty: 'stroke-dashoffset',
    transitionTimingFunction: 'ease-out'
  },
  circularValue: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    gridArea: '1 / 1'
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

const circleRadius = 20;
const circleCircumference = 2 * Math.PI * circleRadius;

export function CircularProgress({
  max = 100,
  showValue = false,
  size = 'md',
  value,
  ...props
}: CircularProgressProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = value === undefined ? undefined : clamp(value, 0, safeMax);
  const percentage = safeValue === undefined ? undefined : (safeValue / safeMax) * 100;
  const indeterminate = safeValue === undefined;
  const dashArray = indeterminate
    ? `${circleCircumference * 0.25} ${circleCircumference * 0.75}`
    : circleCircumference;
  const dashOffset =
    indeterminate || percentage === 100
      ? 0
      : circleCircumference - (circleCircumference * (percentage ?? 0)) / 100;

  return (
    <span
      {...props}
      aria-valuemax={safeMax}
      aria-valuemin={0}
      aria-valuenow={safeValue}
      data-state={indeterminate ? 'indeterminate' : 'determinate'}
      role="progressbar"
      {...stylex.props(styles.circularRoot, styles[`circular${capitalize(size)}`])}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        {...stylex.props(styles.circularSvg, indeterminate && styles.circularIndeterminate)}
      >
        <circle cx="24" cy="24" r={circleRadius} strokeWidth="4" {...stylex.props(styles.track)} />
        <circle
          cx="24"
          cy="24"
          r={circleRadius}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeWidth="4"
          {...stylex.props(styles.circularIndicator)}
        />
      </svg>
      {showValue && percentage !== undefined ? (
        <span aria-hidden="true" {...stylex.props(styles.circularValue)}>
          {Math.round(percentage)}
        </span>
      ) : null}
    </span>
  );
}

function capitalize(value: 'sm' | 'md' | 'lg') {
  return `${value[0].toUpperCase()}${value.slice(1)}` as 'Sm' | 'Md' | 'Lg';
}
