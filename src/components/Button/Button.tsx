import * as React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    className,
    type = 'button',
    ...props
  },
  ref
) {
  const classes = [
    'yx-button',
    variantClassNames[variant],
    sizeClassNames[size],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return <button ref={ref} type={type} className={classes} {...props} />;
});
