import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type StatusVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type StatusProps = Omit<ComponentProps<'span'>, 'className' | 'style'> & {
  variant?: StatusVariant;
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    color: colors.text,
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    gap: spacing.md,
    lineHeight: lineHeights.sm
  },
  dot: {
    borderRadius: radii.full,
    flexShrink: 0,
    height: '8px',
    width: '8px'
  },
  neutral: { backgroundColor: colors.textMuted },
  info: { backgroundColor: colors.info },
  success: { backgroundColor: colors.success },
  warning: { backgroundColor: colors.warning },
  danger: { backgroundColor: colors.danger }
});

export function Status({ children, role = 'status', variant = 'neutral', ...props }: StatusProps) {
  return (
    <span {...props} role={role} {...stylex.props(styles.root)}>
      <span aria-hidden="true" {...stylex.props(styles.dot, styles[variant])} />
      {children}
    </span>
  );
}
