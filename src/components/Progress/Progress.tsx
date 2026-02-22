import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import {
  getProgressIndicatorStyleProps,
  getProgressRootStyleProps,
  type ProgressSize
} from './Progress.styles';

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  ref?: Ref<HTMLDivElement>;
  value: number;
  max?: number;
  size?: ProgressSize;
  className?: string;
  style?: CSSProperties;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Progress({
  ref,
  value,
  max = 100,
  size = 'md',
  className,
  style,
  ...props
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const clampedValue = clamp(value, 0, safeMax);
  const percentage = (clampedValue / safeMax) * 100;
  const rootStyleProps = getProgressRootStyleProps(size, { className, style });
  const indicatorStyleProps = getProgressIndicatorStyleProps({
    style: { width: `${percentage}%` }
  });

  return (
    <div
      {...props}
      {...rootStyleProps}
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={clampedValue}
    >
      <div {...indicatorStyleProps} aria-hidden="true" />
    </div>
  );
}
