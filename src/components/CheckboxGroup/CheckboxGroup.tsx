import * as stylex from '@stylexjs/stylex';
import type { ComponentProps, ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing
} from '../../theme/foundations.stylex';

export type CheckboxGroupProps = Omit<ComponentProps<'fieldset'>, 'className' | 'style'>;
export type CheckboxGroupLegendProps = Omit<ComponentProps<'legend'>, 'className' | 'style'>;
export type CheckboxItemProps = Omit<
  ComponentProps<'input'>,
  'children' | 'className' | 'style' | 'type'
> & { label: ReactNode };

const styles = stylex.create({
  root: {
    borderStyle: 'none',
    borderWidth: 0,
    display: 'grid',
    gap: spacing.md,
    margin: 0,
    padding: 0
  },
  legend: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    marginBottom: spacing.sm,
    padding: 0
  },
  label: {
    alignItems: 'center',
    color: colors.text,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    gap: spacing.md,
    lineHeight: lineHeights.sm
  },
  input: { accentColor: colors.primary, height: spacing.lg, margin: 0, width: spacing.lg }
});

export function CheckboxGroup(props: CheckboxGroupProps) {
  return <fieldset {...props} {...stylex.props(styles.root)} />;
}

export function CheckboxGroupLegend(props: CheckboxGroupLegendProps) {
  return <legend {...props} {...stylex.props(styles.legend)} />;
}

export function CheckboxItem({ label, ...props }: CheckboxItemProps) {
  return (
    <label {...stylex.props(styles.label)}>
      <input {...props} type="checkbox" {...stylex.props(styles.input)} />
      <span>{label}</span>
    </label>
  );
}
