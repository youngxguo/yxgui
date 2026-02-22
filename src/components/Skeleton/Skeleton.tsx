import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { getSkeletonStyleProps, type SkeletonVariant } from './Skeleton.styles';

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  ref?: Ref<HTMLSpanElement>;
  variant?: SkeletonVariant;
  animated?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({
  ref,
  variant = 'text',
  animated = true,
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  const mergedStyle = {
    width,
    height,
    ...style
  } satisfies CSSProperties;
  const styleProps = getSkeletonStyleProps({ variant, animated, className, style: mergedStyle });

  return <span {...props} {...styleProps} ref={ref} aria-hidden="true" data-animated={animated} />;
}
