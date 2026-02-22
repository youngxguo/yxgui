import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { getSeparatorStyleProps, type SeparatorOrientation } from './Separator.styles';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  orientation?: SeparatorOrientation;
  decorative?: boolean;
}

interface StyleOptions {
  className?: string;
  style?: CSSProperties;
}

function getStyleOptions({ className, style }: StyleOptions) {
  return { className, style };
}

export function Separator({
  ref,
  orientation = 'horizontal',
  decorative = false,
  className,
  style,
  ...props
}: SeparatorProps) {
  const styleProps = getSeparatorStyleProps({
    orientation,
    ...getStyleOptions({ className, style })
  });

  return (
    <div
      {...props}
      {...styleProps}
      ref={ref}
      role={decorative ? undefined : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative || undefined}
    />
  );
}
