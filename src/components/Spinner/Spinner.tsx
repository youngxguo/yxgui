import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';

export type SpinnerProps = Omit<ComponentProps<'span'>, 'children' | 'className' | 'style'> & {
  animated?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

const spin = stylex.keyframes({
  to: { transform: 'rotate(360deg)' }
});

const styles = stylex.create({
  root: {
    color: colors.primary,
    display: 'inline-flex',
    flexShrink: 0,
    lineHeight: 0
  },
  sm: { height: '16px', width: '16px' },
  md: { height: '24px', width: '24px' },
  lg: { height: '32px', width: '32px' },
  svg: { display: 'block', height: '100%', width: '100%' },
  animated: {
    animationDuration: '800ms',
    animationIterationCount: 'infinite',
    animationName: {
      default: spin,
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    animationTimingFunction: 'linear'
  }
});

export function Spinner({ animated = true, label, size = 'md', ...props }: SpinnerProps) {
  return (
    <span
      {...props}
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      data-animated={animated}
      role={label === undefined ? undefined : 'status'}
      {...stylex.props(styles.root, styles[size])}
    >
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        {...stylex.props(styles.svg, animated && styles.animated)}
      >
        <circle cx="12" cy="12" opacity="0.25" r="9" stroke="currentColor" strokeWidth="3" />
        <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
      </svg>
    </span>
  );
}
