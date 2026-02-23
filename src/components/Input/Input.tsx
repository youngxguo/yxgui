import type { InputHTMLAttributes, Ref } from 'react';
import { getDataPresenceAttribute, isAriaBooleanTrue } from '../_internal/dataAttributes';
import { getInputStyleProps, type InputSize } from './Input.styles';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  ref?: Ref<HTMLInputElement>;
  size?: InputSize;
  invalid?: boolean;
}

export function Input({
  ref,
  size = 'md',
  invalid: invalidProp = false,
  disabled = false,
  className,
  style,
  'aria-invalid': ariaInvalidProp,
  ...props
}: InputProps) {
  const invalid = invalidProp || isAriaBooleanTrue(ariaInvalidProp);
  const styleProps = getInputStyleProps({ size, invalid, className, style });
  const ariaInvalid = invalid ? true : undefined;

  return (
    <input
      {...props}
      {...styleProps}
      ref={ref}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-invalid={getDataPresenceAttribute(invalid)}
      data-disabled={getDataPresenceAttribute(disabled)}
    />
  );
}
