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

export type AlertProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  variant?: 'info' | 'success' | 'warning' | 'danger';
};
export type AlertTitleProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type AlertDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.text,
    display: 'grid',
    gap: spacing.sm,
    padding: spacing.lg
  },
  info: { borderColor: colors.info },
  success: { borderColor: colors.success },
  warning: { borderColor: colors.warning },
  danger: { borderColor: colors.danger },
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.md,
    margin: 0
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.sm,
    margin: 0
  }
});

export function Alert({ role, variant = 'info', ...props }: AlertProps) {
  return (
    <div
      {...props}
      role={role ?? (variant === 'danger' ? 'alert' : 'status')}
      {...stylex.props(styles.root, styles[variant])}
    />
  );
}

export function AlertTitle(props: AlertTitleProps) {
  return <p {...props} {...stylex.props(styles.title)} />;
}

export function AlertDescription(props: AlertDescriptionProps) {
  return <p {...props} {...stylex.props(styles.description)} />;
}
