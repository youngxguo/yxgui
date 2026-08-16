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

export type StatProps = Omit<ComponentProps<'dl'>, 'className' | 'style'>;
export type StatLabelProps = Omit<ComponentProps<'dt'>, 'className' | 'style'>;
export type StatValueProps = Omit<ComponentProps<'dd'>, 'className' | 'style'>;
export type StatDescriptionProps = Omit<ComponentProps<'dd'>, 'className' | 'style'>;
export type StatTrendProps = Omit<ComponentProps<'span'>, 'className' | 'style'> & {
  direction?: 'down' | 'neutral' | 'up';
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'grid',
    fontFamily: fontFamilies.sans,
    gap: spacing.md,
    margin: 0,
    minWidth: 0,
    padding: spacing.lg
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  value: {
    color: colors.text,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lg,
    margin: 0
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  trend: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  up: { color: colors.success },
  down: { color: colors.danger },
  neutral: { color: colors.textMuted }
});

export function Stat(props: StatProps) {
  return <dl {...props} {...stylex.props(styles.root)} />;
}

export function StatLabel(props: StatLabelProps) {
  return <dt {...props} {...stylex.props(styles.label)} />;
}

export function StatValue(props: StatValueProps) {
  return <dd {...props} {...stylex.props(styles.value)} />;
}

export function StatDescription(props: StatDescriptionProps) {
  return <dd {...props} {...stylex.props(styles.description)} />;
}

export function StatTrend({ direction = 'neutral', ...props }: StatTrendProps) {
  return <span {...props} {...stylex.props(styles.trend, styles[direction])} />;
}
