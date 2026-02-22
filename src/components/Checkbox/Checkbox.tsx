import type { InputHTMLAttributes, Ref } from 'react';
import { getCheckboxStyleProps, type CheckboxSize } from './Checkbox.styles';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  ref?: Ref<HTMLInputElement>;
  size?: CheckboxSize;
  invalid?: boolean;
}

export function Checkbox({
  ref,
  size = 'md',
  invalid = false,
  className,
  style,
  'aria-invalid': ariaInvalidProp,
  ...props
}: CheckboxProps) {
  const styleProps = getCheckboxStyleProps({ size, invalid, className, style });
  const ariaInvalid = invalid ? true : ariaInvalidProp;

  return <input {...props} {...styleProps} ref={ref} type="checkbox" aria-invalid={ariaInvalid} />;
}
