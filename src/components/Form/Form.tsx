import { Form as BaseForm } from '@base-ui/react/form';
import * as stylex from '@stylexjs/stylex';
import { spacing } from '../../theme/foundations.stylex';

export type FormActions = BaseForm.Actions;
export type FormValidationMode = BaseForm.ValidationMode;
export type FormProps<FormValues extends Record<string, unknown> = Record<string, unknown>> = Omit<
  BaseForm.Props<FormValues>,
  'className' | 'render' | 'style'
> & {
  gap?: 'sm' | 'md' | 'lg';
};

const styles = stylex.create({
  root: {
    display: 'grid',
    width: '100%'
  },
  gapSm: { gap: spacing.sm },
  gapMd: { gap: spacing.md },
  gapLg: { gap: spacing.lg }
});

const gapStyles = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg
} as const;

export function Form<FormValues extends Record<string, unknown> = Record<string, unknown>>({
  gap = 'lg',
  ...props
}: FormProps<FormValues>) {
  return <BaseForm {...props} className={stylex.props(styles.root, gapStyles[gap]).className} />;
}
