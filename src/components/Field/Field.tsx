import { Field as BaseField } from '@base-ui/react/field';
import * as stylex from '@stylexjs/stylex';
import { createContext, useContext, type ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing
} from '../../theme/foundations.stylex';

export type FieldProps = Omit<BaseField.Root.Props, 'className' | 'render' | 'style'>;
export type FieldLabelProps = Omit<BaseField.Label.Props, 'className' | 'render' | 'style'>;
export type FieldDescriptionProps = Omit<
  BaseField.Description.Props,
  'className' | 'render' | 'style'
>;
export type FieldErrorProps = Omit<BaseField.Error.Props, 'className' | 'render' | 'style'>;

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

const FieldContext = createContext(false);

export function Field({ children, ...props }: FieldProps) {
  return (
    <BaseField.Root {...props} className={stylex.props(styles.field).className}>
      <FieldContext.Provider value>{children}</FieldContext.Provider>
    </BaseField.Root>
  );
}

export function FieldLabel(props: FieldLabelProps) {
  const insideField = useContext(FieldContext);
  if (!insideField) {
    const { nativeLabel: _nativeLabel, ...nativeProps } = props;
    void _nativeLabel;
    return (
      <label
        {...(nativeProps as ComponentProps<'label'>)}
        {...stylex.props(styles.text, styles.label)}
      />
    );
  }

  return (
    <BaseField.Label {...props} className={stylex.props(styles.text, styles.label).className} />
  );
}

export function FieldDescription(props: FieldDescriptionProps) {
  const insideField = useContext(FieldContext);
  if (!insideField) {
    return (
      <p {...(props as ComponentProps<'p'>)} {...stylex.props(styles.text, styles.description)} />
    );
  }

  return (
    <BaseField.Description
      {...props}
      className={stylex.props(styles.text, styles.description).className}
    />
  );
}

export function FieldError({ role = 'alert', ...props }: FieldErrorProps) {
  const insideField = useContext(FieldContext);
  if (!insideField) {
    const { match: _match, ...nativeProps } = props;
    void _match;
    return (
      <p
        {...(nativeProps as ComponentProps<'p'>)}
        role={role}
        {...stylex.props(styles.text, styles.error)}
      />
    );
  }

  return (
    <BaseField.Error
      {...props}
      className={stylex.props(styles.text, styles.error).className}
      match={props.match ?? (props.children ? true : undefined)}
      role={role}
    />
  );
}
