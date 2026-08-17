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

export type FieldOrientation = 'vertical' | 'horizontal' | 'responsive';
export type FieldProps = Omit<BaseField.Root.Props, 'className' | 'render' | 'style'> & {
  orientation?: FieldOrientation;
};
export type FieldLabelProps = Omit<BaseField.Label.Props, 'className' | 'render' | 'style'>;
export type FieldDescriptionProps = Omit<
  BaseField.Description.Props,
  'className' | 'render' | 'style'
>;
export type FieldErrorProps = Omit<BaseField.Error.Props, 'className' | 'render' | 'style'>;
export type FieldGroupProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type FieldContentProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type FieldTitleProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type FieldSeparatorProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;

const styles = stylex.create({
  field: {
    display: 'grid',
    gap: spacing.sm
  },
  horizontal: {
    alignItems: 'flex-start',
    gridTemplateColumns: 'auto minmax(0, 1fr)'
  },
  responsive: {
    alignItems: { default: 'stretch', '@media (min-width: 640px)': 'flex-start' },
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 640px)': 'auto minmax(0, 1fr)'
    }
  },
  group: { display: 'grid', gap: spacing.lg },
  content: { display: 'grid', gap: spacing.sm, minWidth: 0 },
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
  title: { color: colors.text, fontWeight: fontWeights.semibold },
  description: {
    color: colors.textMuted,
    fontWeight: fontWeights.regular
  },
  error: {
    color: colors.danger,
    fontWeight: fontWeights.regular
  },
  separator: {
    alignItems: 'center',
    color: colors.textMuted,
    display: 'grid',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    gap: spacing.md,
    gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
    lineHeight: lineHeights.sm,
    '::before': { backgroundColor: colors.borderMuted, content: '""', height: '1px' },
    '::after': { backgroundColor: colors.borderMuted, content: '""', height: '1px' }
  },
  emptySeparator: {
    backgroundColor: colors.borderMuted,
    display: 'block',
    height: '1px'
  }
});

const FieldContext = createContext(false);

export function Field({ children, orientation = 'vertical', ...props }: FieldProps) {
  return (
    <BaseField.Root
      {...props}
      className={
        stylex.props(
          styles.field,
          orientation === 'horizontal' && styles.horizontal,
          orientation === 'responsive' && styles.responsive
        ).className
      }
    >
      <FieldContext.Provider value>{children}</FieldContext.Provider>
    </BaseField.Root>
  );
}

export function FieldGroup(props: FieldGroupProps) {
  return <div {...props} {...stylex.props(styles.group)} />;
}

export function FieldContent(props: FieldContentProps) {
  return <div {...props} {...stylex.props(styles.content)} />;
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

export function FieldTitle(props: FieldTitleProps) {
  return <p {...props} {...stylex.props(styles.text, styles.title)} />;
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

export function FieldSeparator({
  'aria-orientation': ariaOrientation = 'horizontal',
  children,
  role = 'separator',
  ...props
}: FieldSeparatorProps) {
  return (
    <div
      {...props}
      aria-orientation={ariaOrientation}
      role={role}
      {...stylex.props(children ? styles.separator : styles.emptySeparator)}
    >
      {children}
    </div>
  );
}
