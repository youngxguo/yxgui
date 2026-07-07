import type { ButtonHTMLAttributes, Ref } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export function Button({
  className,
  ref,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = ['yx-button', `yx-button--${variant}`, `yx-button--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return <button ref={ref} className={classes} type={type} {...props} />;
}
