import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import * as stylex from '@stylexjs/stylex';
import { useId, type ReactNode, type Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type NumberFieldInputProps = Omit<
  BaseNumberField.Input.Props,
  'className' | 'render' | 'style'
>;

export type NumberFieldProps = Omit<
  BaseNumberField.Root.Props,
  'children' | 'className' | 'render' | 'style'
> & {
  inputProps?: NumberFieldInputProps;
  label: ReactNode;
  ref?: Ref<HTMLDivElement>;
};

const styles = stylex.create({
  root: { display: 'grid', fontFamily: fontFamilies.sans, gap: spacing.sm },
  label: {
    color: colors.text,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  group: {
    alignItems: 'stretch',
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    overflow: 'hidden'
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 0,
    color: colors.text,
    flexGrow: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minWidth: 0,
    outline: 'none',
    padding: spacing.md,
    textAlign: 'center'
  },
  button: {
    backgroundColor: { default: colors.surfaceElevated, ':hover': colors.surfaceSubtle },
    borderColor: colors.borderMuted,
    borderStyle: 'solid',
    borderWidth: 0,
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    minWidth: '36px',
    padding: spacing.md
  },
  decrement: { borderRightWidth: '1px' },
  increment: { borderLeftWidth: '1px' },
  disabled: { opacity: 0.6 }
});

export function NumberField({
  disabled = false,
  id: providedId,
  inputProps,
  label,
  ...props
}: NumberFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <BaseNumberField.Root
      {...props}
      disabled={disabled}
      id={id}
      className={stylex.props(styles.root, disabled && styles.disabled).className}
    >
      <label htmlFor={id} {...stylex.props(styles.label)}>
        {label}
      </label>
      <BaseNumberField.Group className={stylex.props(styles.group).className}>
        <BaseNumberField.Decrement
          aria-label="Decrease"
          className={stylex.props(styles.button, styles.decrement).className}
        >
          −
        </BaseNumberField.Decrement>
        <BaseNumberField.Input {...inputProps} className={stylex.props(styles.input).className} />
        <BaseNumberField.Increment
          aria-label="Increase"
          className={stylex.props(styles.button, styles.increment).className}
        >
          +
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
