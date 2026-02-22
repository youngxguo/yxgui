import type { Ref, SelectHTMLAttributes } from 'react';
import { getSelectStyleProps, type SelectSize } from './Select.styles';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  ref?: Ref<HTMLSelectElement>;
  size?: SelectSize;
  invalid?: boolean;
}

export function Select({
  ref,
  size = 'md',
  invalid = false,
  className,
  style,
  'aria-invalid': ariaInvalidProp,
  ...props
}: SelectProps) {
  const styleProps = getSelectStyleProps({ size, invalid, className, style });
  const ariaInvalid = invalid ? true : ariaInvalidProp;

  return <select {...props} {...styleProps} ref={ref} aria-invalid={ariaInvalid} />;
}
