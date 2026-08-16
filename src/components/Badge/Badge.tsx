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

export type BadgeProps = Omit<ComponentProps<'span'>, 'className' | 'style'> & {
  size?: 'sm' | 'md';
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.full,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    whiteSpace: 'nowrap',
    width: 'fit-content'
  },
  sm: {
    fontSize: fontSizes.xs,
    paddingBlock: '1px',
    paddingInline: spacing.md
  },
  md: {
    fontSize: fontSizes.sm,
    paddingBlock: '2px',
    paddingInline: spacing.md
  },
  neutral: {
    borderColor: colors.borderMuted,
    color: colors.textMuted
  },
  info: {
    borderColor: colors.info,
    color: colors.info
  },
  success: {
    borderColor: colors.success,
    color: colors.success
  },
  warning: {
    borderColor: colors.warning,
    color: colors.warning
  },
  danger: {
    borderColor: colors.danger,
    color: colors.danger
  }
});

export function Badge({ size = 'md', variant = 'neutral', ...props }: BadgeProps) {
  return <span {...props} {...stylex.props(styles.root, styles[size], styles[variant])} />;
}
