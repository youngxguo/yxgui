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

export type FieldsetProps = Omit<ComponentProps<'fieldset'>, 'className' | 'style'>;
export type FieldsetLegendProps = Omit<ComponentProps<'legend'>, 'className' | 'style'>;
export type FieldsetDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'grid',
    gap: spacing.lg,
    margin: 0,
    padding: spacing.lg
  },
  text: { fontFamily: fontFamilies.sans },
  legend: {
    color: colors.text,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    paddingInline: spacing.sm
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  }
});

export function Fieldset(props: FieldsetProps) {
  return <fieldset {...props} {...stylex.props(styles.root)} />;
}

export function FieldsetLegend(props: FieldsetLegendProps) {
  return <legend {...props} {...stylex.props(styles.text, styles.legend)} />;
}

export function FieldsetDescription(props: FieldsetDescriptionProps) {
  return <p {...props} {...stylex.props(styles.text, styles.description)} />;
}
