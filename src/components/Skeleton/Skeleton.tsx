import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { radii } from '../../theme/foundations.stylex';

export type SkeletonProps = Omit<ComponentProps<'span'>, 'children' | 'className' | 'style'> & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'text' | 'avatar' | 'block';
  width?: 'sm' | 'md' | 'lg' | 'full';
};

const pulse = stylex.keyframes({
  '0%, 100%': { opacity: 0.55 },
  '50%': { opacity: 1 }
});

const styles = stylex.create({
  root: {
    animationDuration: '1.6s',
    animationIterationCount: 'infinite',
    animationName: {
      default: pulse,
      '@media (prefers-reduced-motion: reduce)': 'none'
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: colors.surfaceSubtle,
    display: 'block'
  },
  text: {
    borderRadius: radii.sm,
    height: '16px'
  },
  avatar: {
    borderRadius: radii.full
  },
  block: {
    borderRadius: radii.md
  },
  sizeSm: { height: '24px' },
  sizeMd: { height: '48px' },
  sizeLg: { height: '96px' },
  avatarSm: { height: '24px', width: '24px' },
  avatarMd: { height: '32px', width: '32px' },
  avatarLg: { height: '40px', width: '40px' },
  widthSm: { width: '64px' },
  widthMd: { width: '128px' },
  widthLg: { width: '192px' },
  widthFull: { width: '100%' }
});

const widthStyles = {
  sm: styles.widthSm,
  md: styles.widthMd,
  lg: styles.widthLg,
  full: styles.widthFull
};

const blockSizeStyles = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg
};

const avatarSizeStyles = {
  sm: styles.avatarSm,
  md: styles.avatarMd,
  lg: styles.avatarLg
};

export function Skeleton({
  size = 'md',
  variant = 'text',
  width = 'full',
  ...props
}: SkeletonProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      {...stylex.props(
        styles.root,
        styles[variant],
        variant === 'avatar' ? avatarSizeStyles[size] : widthStyles[width],
        variant === 'block' && blockSizeStyles[size]
      )}
    />
  );
}
