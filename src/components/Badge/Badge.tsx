import type { HTMLAttributes, Ref } from 'react';
import { getBadgeStyleProps, type BadgeSize, type BadgeVariant } from './Badge.styles';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function Badge({
  ref,
  variant = 'primary',
  size = 'md',
  className,
  style,
  ...props
}: BadgeProps) {
  const styleProps = getBadgeStyleProps({ variant, size, className, style });

  return <span {...props} {...styleProps} ref={ref} />;
}
