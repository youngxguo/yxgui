import * as stylex from '@stylexjs/stylex';
import type { ComponentProps, ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, lineHeights, spacing } from '../../theme/foundations.stylex';

export type RadioGroupProps = Omit<ComponentProps<'fieldset'>, 'className' | 'style'>;
export type RadioGroupLegendProps = Omit<ComponentProps<'legend'>, 'className' | 'style'>;
export type RadioProps = Omit<
  ComponentProps<'input'>,
  'children' | 'className' | 'style' | 'type'
> & {
  label: ReactNode;
};

const styles = stylex.create({
  group: {
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
  input: {
    accentColor: colors.primary,
    height: spacing.lg,
    margin: 0,
    width: spacing.lg
  }
});

export function RadioGroup(props: RadioGroupProps) {
  return <fieldset {...props} {...stylex.props(styles.group)} />;
}

export function RadioGroupLegend(props: RadioGroupLegendProps) {
  return <legend {...props} {...stylex.props(styles.legend)} />;
}

export function Radio({ label, ...props }: RadioProps) {
  return (
    <label {...stylex.props(styles.label)}>
      <input {...props} type="radio" {...stylex.props(styles.input)} />
      <span>{label}</span>
    </label>
  );
}
