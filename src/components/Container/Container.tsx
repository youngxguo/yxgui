import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { spacing } from '../../theme/foundations.stylex';

export type ContainerProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  as?: 'div' | 'main' | 'section';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  size?: 'sm' | 'md' | 'lg' | 'full';
};

const styles = stylex.create({
  root: {
    boxSizing: 'border-box',
    marginInline: 'auto',
    width: '100%'
  },
  sizeSm: { maxWidth: '640px' },
  sizeMd: { maxWidth: '960px' },
  sizeLg: { maxWidth: '1200px' },
  paddingSm: { paddingInline: spacing.sm },
  paddingMd: { paddingInline: spacing.md },
  paddingLg: { paddingInline: spacing.lg }
});

const sizeStyles = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg
} as const;

const paddingStyles = {
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg
} as const;

export function Container({
  as: Component = 'div',
  padding = 'lg',
  size = 'lg',
  ...props
}: ContainerProps) {
  return (
    <Component
      {...props}
      {...stylex.props(
        styles.root,
        size !== 'full' && sizeStyles[size],
        padding !== 'none' && paddingStyles[padding]
      )}
    />
  );
}
