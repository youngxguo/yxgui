import * as stylex from '@stylexjs/stylex';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEventHandler,
  type ComponentProps,
  type FocusEventHandler,
  type ReactNode,
  type Ref
} from 'react';
import { colors } from '../../theme/colors.stylex';
import { spacing } from '../../theme/foundations.stylex';
import { fieldControlStyles as styles } from '../fieldControlStyles.stylex';

export type ColorFieldProps = Omit<
  ComponentProps<'input'>,
  | 'aria-describedby'
  | 'aria-invalid'
  | 'children'
  | 'className'
  | 'defaultValue'
  | 'maxLength'
  | 'pattern'
  | 'style'
  | 'type'
  | 'value'
> & {
  defaultValue?: string;
  description?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  label: ReactNode;
  onValueChange?: (value: string) => void;
  pickerLabel?: string;
  value?: string;
};

const colorStyles = stylex.create({
  picker: {
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    flexShrink: 0,
    minHeight: '38px',
    padding: spacing.sm,
    width: '44px'
  },
  divider: { borderLeftColor: colors.borderMuted, borderLeftStyle: 'solid', borderLeftWidth: '1px' }
});

function normalizeHex(value: string) {
  const short = /^#([\da-f]{3})$/i.exec(value.trim());
  if (short) {
    return `#${short[1]
      .split('')
      .map((character) => character.repeat(2))
      .join('')}`.toLowerCase();
  }
  return /^#[\da-f]{6}$/i.test(value.trim()) ? value.trim().toLowerCase() : null;
}

function assignRef(ref: Ref<HTMLInputElement> | undefined, node: HTMLInputElement | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

export function ColorField({
  defaultValue = '#000000',
  description,
  disabled = false,
  error,
  fullWidth = false,
  id,
  inputRef,
  label,
  onBlur,
  onChange,
  onValueChange,
  pickerLabel = 'Choose color',
  value,
  ...props
}: ColorFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const initialValue = normalizeHex(defaultValue) ?? '#000000';
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);
  const [draft, setDraft] = useState(initialValue);
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const currentValue = normalizeHex(value ?? uncontrolledValue) ?? '#000000';
  const displayValue = value ?? draft;
  const describedBy = [description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    const form = textInputRef.current?.form;
    const reset = () => {
      if (value === undefined) {
        setUncontrolledValue(initialValue);
        setDraft(initialValue);
      }
    };
    form?.addEventListener('reset', reset);
    return () => form?.removeEventListener('reset', reset);
  }, [initialValue, value]);

  const update = (nextValue: string) => {
    if (value === undefined) {
      setUncontrolledValue(nextValue);
      setDraft(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextDraft = event.currentTarget.value;
    if (value === undefined) setDraft(nextDraft);
    const normalized = normalizeHex(nextDraft);
    if (normalized && nextDraft.trim().length === 7) {
      if (value === undefined) setUncontrolledValue(normalized);
      onValueChange?.(normalized);
    }
    onChange?.(event);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const normalized = normalizeHex(event.currentTarget.value);
    if (normalized) update(normalized);
    else if (value === undefined) setDraft(currentValue);
    onBlur?.(event);
  };

  return (
    <div {...stylex.props(styles.field, fullWidth && styles.fullWidth)}>
      <label htmlFor={inputId} {...stylex.props(styles.label)}>
        {label}
      </label>
      <div
        {...stylex.props(
          styles.group,
          Boolean(error) && styles.invalid,
          disabled && styles.disabled
        )}
      >
        <input
          {...props}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          id={inputId}
          maxLength={7}
          pattern="#[0-9a-fA-F]{6}"
          ref={(node) => {
            textInputRef.current = node;
            assignRef(inputRef, node);
          }}
          spellCheck={false}
          type="text"
          value={displayValue}
          onBlur={handleBlur}
          onChange={handleTextChange}
          {...stylex.props(styles.input, disabled && styles.disabledInput)}
        />
        <input
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          aria-label={pickerLabel}
          disabled={disabled}
          type="color"
          value={currentValue}
          onChange={(event) => update(event.currentTarget.value)}
          {...stylex.props(colorStyles.picker, colorStyles.divider)}
        />
      </div>
      {description && (
        <p id={descriptionId} {...stylex.props(styles.description)}>
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" {...stylex.props(styles.error)}>
          {error}
        </p>
      )}
    </div>
  );
}
