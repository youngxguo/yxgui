import { useId, type ReactNode, type Ref } from 'react';
import { Field, FieldDescription, FieldError, FieldLabel } from '../Field';
import { Input, type InputProps } from '../Input';

type NativeDateTimeFieldProps = Omit<
  InputProps,
  'aria-describedby' | 'aria-invalid' | 'fullWidth' | 'ref' | 'type'
> & {
  description?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  label: ReactNode;
};

export type DateFieldProps = NativeDateTimeFieldProps;
export type TimeFieldProps = NativeDateTimeFieldProps;
export type DateTimeFieldProps = NativeDateTimeFieldProps;

function NativeDateTimeField({
  description,
  disabled,
  error,
  fullWidth = false,
  id,
  inputRef,
  label,
  type,
  ...props
}: NativeDateTimeFieldProps & { type: 'date' | 'datetime-local' | 'time' }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const describedBy = [description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <Field disabled={disabled} invalid={Boolean(error)}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <Input
        {...props}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        disabled={disabled}
        fullWidth={fullWidth}
        id={inputId}
        ref={inputRef}
        type={type}
      />
      {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </Field>
  );
}

export function DateField(props: DateFieldProps) {
  return <NativeDateTimeField {...props} type="date" />;
}

export function TimeField(props: TimeFieldProps) {
  return <NativeDateTimeField {...props} type="time" />;
}

export function DateTimeField(props: DateTimeFieldProps) {
  return <NativeDateTimeField {...props} type="datetime-local" />;
}
