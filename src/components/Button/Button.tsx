import type { ButtonHTMLAttributes, Ref } from 'react';
import { getDataPresenceAttribute } from '../_internal/dataAttributes';
import { getButtonStyleProps, type ButtonSize, type ButtonVariant } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  ref,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  style,
  type = 'button',
  ...props
}: ButtonProps) {
  const styleProps = getButtonStyleProps({ variant, size, className, style });

  return (
    <button
      {...props}
      {...styleProps}
      ref={ref}
      type={type}
      disabled={disabled}
      data-disabled={getDataPresenceAttribute(disabled)}
    />
  );
}
