import * as stylex from '@stylexjs/stylex';
import { useId, useState, type ComponentProps, type ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type SegmentedControlOption = {
  disabled?: boolean;
  label: ReactNode;
  value: string;
};

export type SegmentedControlProps = Omit<
  ComponentProps<'fieldset'>,
  'children' | 'className' | 'name' | 'onChange' | 'style'
> & {
  defaultValue?: string;
  description?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  label: ReactNode;
  name?: string;
  onValueChange?: (value: string) => void;
  options: readonly SegmentedControlOption[];
  orientation?: 'horizontal' | 'vertical';
  required?: boolean;
  value?: string;
};

const styles = stylex.create({
  root: {
    borderWidth: 0,
    display: 'grid',
    gap: spacing.sm,
    margin: 0,
    maxWidth: '100%',
    padding: 0,
    width: 'fit-content'
  },
  fullWidth: { width: '100%' },
  legend: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    marginBottom: spacing.sm,
    padding: 0
  },
  options: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'inline-flex',
    gap: spacing.sm,
    padding: spacing.sm
  },
  fullWidthOptions: { width: '100%' },
  vertical: { alignItems: 'stretch', flexDirection: 'column' },
  invalid: { borderColor: colors.danger },
  option: {
    borderRadius: radii.sm,
    cursor: { default: 'pointer', ':has(input:disabled)': 'not-allowed' },
    display: 'grid',
    flex: 1,
    minWidth: 0,
    outline: { default: '2px solid transparent', ':focus-within': `2px solid ${colors.primary}` },
    outlineOffset: '1px',
    position: 'relative'
  },
  input: {
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    height: '100%',
    inset: 0,
    margin: 0,
    opacity: 0,
    position: 'absolute',
    width: '100%'
  },
  optionLabel: {
    borderRadius: radii.sm,
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.lg,
    textAlign: 'center',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  selected: {
    backgroundColor: colors.surfaceElevated,
    boxShadow: '0 1px 2px rgba(17, 24, 39, 0.16)',
    color: colors.text
  },
  disabled: { color: colors.textDisabled },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  error: {
    color: colors.danger,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  }
});

export function SegmentedControl({
  'aria-describedby': ariaDescribedBy,
  defaultValue,
  description,
  disabled = false,
  error,
  fullWidth = false,
  label,
  name,
  onValueChange,
  options,
  orientation = 'horizontal',
  required,
  value,
  ...props
}: SegmentedControlProps) {
  const generatedId = useId();
  const fieldName = name ?? generatedId;
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;
  const describedBy = [ariaDescribedBy, description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = value ?? uncontrolledValue;

  const select = (nextValue: string) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <fieldset
      {...props}
      aria-describedby={describedBy || undefined}
      aria-invalid={error ? true : undefined}
      disabled={disabled}
      {...stylex.props(styles.root, fullWidth && styles.fullWidth)}
    >
      <legend {...stylex.props(styles.legend)}>{label}</legend>
      <span
        {...stylex.props(
          styles.options,
          fullWidth && styles.fullWidthOptions,
          orientation === 'vertical' && styles.vertical,
          Boolean(error) && styles.invalid
        )}
      >
        {options.map((option) => (
          <label key={option.value} {...stylex.props(styles.option)}>
            <input
              checked={currentValue === option.value}
              disabled={disabled || option.disabled}
              name={fieldName}
              required={required}
              type="radio"
              value={option.value}
              onChange={() => select(option.value)}
              {...stylex.props(styles.input)}
            />
            <span
              {...stylex.props(
                styles.optionLabel,
                currentValue === option.value && styles.selected,
                (disabled || option.disabled) && styles.disabled
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </span>
      {description ? (
        <p id={descriptionId} {...stylex.props(styles.description)}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} {...stylex.props(styles.error)}>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
