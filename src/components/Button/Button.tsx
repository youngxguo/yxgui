import type { ButtonHTMLAttributes, Ref } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variantClassNames: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'yx-button--primary',
  secondary: 'yx-button--secondary',
  ghost: 'yx-button--ghost'
};

const sizeClassNames: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'yx-button--sm',
  md: 'yx-button--md',
  lg: 'yx-button--lg'
};

export function Button({
  ref,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = ['yx-button', variantClassNames[variant], sizeClassNames[size], className]
    .filter(Boolean)
    .join(' ');

  return <button ref={ref} type={type} className={classes} {...props} />;
}
