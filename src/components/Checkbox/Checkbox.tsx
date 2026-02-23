import type { InputHTMLAttributes, Ref } from 'react';
import { getDataPresenceAttribute, isAriaBooleanTrue } from '../_internal/dataAttributes';
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
  invalid: invalidProp = false,
  disabled = false,
  className,
  style,
  'aria-invalid': ariaInvalidProp,
  ...props
}: CheckboxProps) {
  const invalid = invalidProp || isAriaBooleanTrue(ariaInvalidProp);
  const styleProps = getCheckboxStyleProps({ size, invalid, className, style });
  const ariaInvalid = invalid ? true : undefined;

  return (
    <input
      {...props}
      {...styleProps}
      ref={ref}
      type="checkbox"
      disabled={disabled}
      aria-invalid={ariaInvalid}
      data-invalid={getDataPresenceAttribute(invalid)}
      data-disabled={getDataPresenceAttribute(disabled)}
    />
  );
}
