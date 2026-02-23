import type { Ref, SelectHTMLAttributes } from 'react';
import { getDataPresenceAttribute, isAriaBooleanTrue } from '../_internal/dataAttributes';
import { getSelectStyleProps, type SelectSize } from './Select.styles';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  ref?: Ref<HTMLSelectElement>;
  size?: SelectSize;
  invalid?: boolean;
}

export function Select({
  ref,
  size = 'md',
  invalid: invalidProp = false,
  disabled = false,
  className,
  style,
  'aria-invalid': ariaInvalidProp,
  ...props
}: SelectProps) {
  const invalid = invalidProp || isAriaBooleanTrue(ariaInvalidProp);
  const styleProps = getSelectStyleProps({ size, invalid, className, style });
  const ariaInvalid = invalid ? true : undefined;

  return (
    <select
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
