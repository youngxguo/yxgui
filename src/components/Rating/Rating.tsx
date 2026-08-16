import * as stylex from '@stylexjs/stylex';
import { useId, useState, type ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type RatingProps = Omit<
  ComponentProps<'fieldset'>,
  'children' | 'className' | 'name' | 'onChange' | 'style'
> & {
  defaultValue?: number;
  label: string;
  max?: number;
  name?: string;
  onValueChange?: (value: number) => void;
  required?: boolean;
  value?: number;
};

const styles = stylex.create({
  root: { borderWidth: 0, display: 'grid', gap: spacing.md, margin: 0, padding: 0 },
  legend: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    marginBottom: spacing.md,
    padding: 0
  },
  options: { display: 'flex', gap: spacing.sm },
  option: {
    alignItems: 'center',
    borderRadius: radii.sm,
    cursor: { default: 'pointer', ':has(input:disabled)': 'not-allowed' },
    display: 'inline-flex',
    height: '36px',
    justifyContent: 'center',
    outline: { default: '2px solid transparent', ':focus-within': `2px solid ${colors.primary}` },
    outlineOffset: '2px',
    position: 'relative',
    width: '36px'
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
  star: {
    color: colors.borderMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    userSelect: 'none'
  },
  selected: { color: colors.warning },
  disabled: { color: colors.textDisabled }
});

function normalizeValue(value: number, max: number) {
  return Math.min(Math.max(Math.round(value), 0), max);
}

export function Rating({
  defaultValue = 0,
  disabled,
  label,
  max = 5,
  name,
  onValueChange,
  required,
  value,
  ...props
}: RatingProps) {
  const generatedName = useId();
  const optionCount = Math.max(Math.round(max), 1);
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    normalizeValue(defaultValue, optionCount)
  );
  const currentValue = normalizeValue(value ?? uncontrolledValue, optionCount);
  const fieldName = name ?? generatedName;

  const select = (nextValue: number) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <fieldset {...props} disabled={disabled} {...stylex.props(styles.root)}>
      <legend {...stylex.props(styles.legend)}>{label}</legend>
      <span {...stylex.props(styles.options)}>
        {Array.from({ length: optionCount }, (_, index) => {
          const optionValue = index + 1;
          const optionLabel = `${optionValue} ${optionValue === 1 ? 'star' : 'stars'}`;
          return (
            <label key={optionValue} {...stylex.props(styles.option)}>
              <input
                aria-label={optionLabel}
                checked={currentValue === optionValue}
                disabled={disabled}
                name={fieldName}
                required={required}
                type="radio"
                value={optionValue}
                onChange={() => select(optionValue)}
                {...stylex.props(styles.input)}
              />
              <span
                aria-hidden="true"
                {...stylex.props(
                  styles.star,
                  optionValue <= currentValue && styles.selected,
                  disabled && styles.disabled
                )}
              >
                ★
              </span>
            </label>
          );
        })}
      </span>
    </fieldset>
  );
}
