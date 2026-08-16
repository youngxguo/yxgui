import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing
} from '../../theme/foundations.stylex';

export type FieldProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type FieldLabelProps = Omit<ComponentProps<'label'>, 'className' | 'style'>;
export type FieldDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type FieldErrorProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;

const styles = stylex.create({
  field: {
    display: 'grid',
    gap: spacing.sm
  },
  text: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  label: {
    color: colors.text,
    fontWeight: fontWeights.semibold
  },
  description: {
    color: colors.textMuted,
    fontWeight: fontWeights.regular
  },
  error: {
    color: colors.danger,
    fontWeight: fontWeights.regular
  }
});

export function Field(props: FieldProps) {
  return <div {...props} {...stylex.props(styles.field)} />;
}

export function FieldLabel(props: FieldLabelProps) {
  return <label {...props} {...stylex.props(styles.text, styles.label)} />;
}

export function FieldDescription(props: FieldDescriptionProps) {
  return <p {...props} {...stylex.props(styles.text, styles.description)} />;
}

export function FieldError({ role = 'alert', ...props }: FieldErrorProps) {
  return <p {...props} role={role} {...stylex.props(styles.text, styles.error)} />;
}
