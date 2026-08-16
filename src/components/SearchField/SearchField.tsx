import * as stylex from '@stylexjs/stylex';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEventHandler,
  type ComponentProps,
  type ReactNode,
  type Ref
} from 'react';
import { fieldControlStyles as styles } from '../fieldControlStyles.stylex';

export type SearchFieldProps = Omit<
  ComponentProps<'input'>,
  | 'aria-describedby'
  | 'aria-invalid'
  | 'children'
  | 'className'
  | 'defaultValue'
  | 'style'
  | 'type'
  | 'value'
> & {
  clearLabel?: string;
  defaultValue?: string;
  description?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  label: ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
};

function assignRef(ref: Ref<HTMLInputElement> | undefined, node: HTMLInputElement | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

export function SearchField({
  clearLabel = 'Clear search',
  defaultValue = '',
  description,
  disabled = false,
  error,
  fullWidth = false,
  id,
  inputRef,
  label,
  onChange,
  onValueChange,
  value,
  ...props
}: SearchFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const nativeInputRef = useRef<HTMLInputElement | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = value ?? uncontrolledValue;
  const describedBy = [description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    const form = nativeInputRef.current?.form;
    const reset = () => value === undefined && setUncontrolledValue(defaultValue);
    form?.addEventListener('reset', reset);
    return () => form?.removeEventListener('reset', reset);
  }, [defaultValue, value]);

  const update = (nextValue: string) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    update(event.currentTarget.value);
    onChange?.(event);
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
          ref={(node) => {
            nativeInputRef.current = node;
            assignRef(inputRef, node);
          }}
          type="search"
          value={currentValue}
          onChange={handleChange}
          {...stylex.props(styles.input, disabled && styles.disabledInput)}
        />
        {currentValue && (
          <button
            aria-label={clearLabel}
            disabled={disabled}
            type="button"
            onClick={() => {
              update('');
              nativeInputRef.current?.focus();
            }}
            {...stylex.props(styles.action)}
          >
            ×
          </button>
        )}
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
