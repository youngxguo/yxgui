import * as stylex from '@stylexjs/stylex';
import { useId, useState, type ComponentProps, type ReactNode, type Ref } from 'react';
import { fieldControlStyles as styles } from '../fieldControlStyles.stylex';

export type PasswordFieldProps = Omit<
  ComponentProps<'input'>,
  'aria-describedby' | 'aria-invalid' | 'children' | 'className' | 'style' | 'type'
> & {
  defaultVisible?: boolean;
  description?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  hideLabel?: string;
  inputRef?: Ref<HTMLInputElement>;
  label: ReactNode;
  onVisibleChange?: (visible: boolean) => void;
  showLabel?: string;
  visible?: boolean;
};

export function PasswordField({
  defaultVisible = false,
  description,
  disabled = false,
  error,
  fullWidth = false,
  hideLabel = 'Hide password',
  id,
  inputRef,
  label,
  onVisibleChange,
  showLabel = 'Show password',
  visible,
  ...props
}: PasswordFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const [uncontrolledVisible, setUncontrolledVisible] = useState(defaultVisible);
  const isVisible = visible ?? uncontrolledVisible;
  const describedBy = [description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  const toggle = () => {
    const nextVisible = !isVisible;
    if (visible === undefined) setUncontrolledVisible(nextVisible);
    onVisibleChange?.(nextVisible);
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
          ref={inputRef}
          type={isVisible ? 'text' : 'password'}
          {...stylex.props(styles.input, disabled && styles.disabledInput)}
        />
        <button
          aria-label={isVisible ? hideLabel : showLabel}
          disabled={disabled}
          type="button"
          onClick={toggle}
          {...stylex.props(styles.action)}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
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
