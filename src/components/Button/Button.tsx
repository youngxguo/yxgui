import type { ButtonHTMLAttributes, Ref } from 'react';
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
  className,
  style,
  type = 'button',
  ...props
}: ButtonProps) {
  const styleProps = getButtonStyleProps({ variant, size, className, style });

  return <button {...props} {...styleProps} ref={ref} type={type} />;
}
