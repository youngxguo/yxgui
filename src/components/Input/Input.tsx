import type { InputHTMLAttributes, Ref } from 'react';
import { getInputStyleProps, type InputSize } from './Input.styles';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  ref?: Ref<HTMLInputElement>;
  size?: InputSize;
  invalid?: boolean;
}

export function Input({
  ref,
  size = 'md',
  invalid = false,
  className,
  style,
  'aria-invalid': ariaInvalidProp,
  ...props
}: InputProps) {
  const styleProps = getInputStyleProps({ size, invalid, className, style });
  const ariaInvalid = invalid ? true : ariaInvalidProp;

  return <input {...props} {...styleProps} ref={ref} aria-invalid={ariaInvalid} />;
}
