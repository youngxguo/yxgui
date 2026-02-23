import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import {
  getSpinnerRootStyleProps,
  getSpinnerSvgStyleProps,
  type SpinnerSize
} from './Spinner.styles';

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  ref?: Ref<HTMLSpanElement>;
  size?: SpinnerSize;
  animated?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Spinner({
  ref,
  size = 'md',
  animated = true,
  label,
  className,
  style,
  role,
  'aria-label': ariaLabelProp,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SpinnerProps) {
  const rootStyleProps = getSpinnerRootStyleProps({ size, className, style });
  const svgStyleProps = getSpinnerSvgStyleProps();
  const ariaLabel = ariaLabelProp ?? label;
  const hasAccessibleName = Boolean(ariaLabel || ariaLabelledBy);
  const resolvedRole = role ?? (hasAccessibleName ? 'status' : undefined);
  const decorative = !hasAccessibleName && resolvedRole == null;

  return (
    <span
      {...props}
      {...rootStyleProps}
      ref={ref}
      role={resolvedRole}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={decorative || undefined}
      data-animated={animated}
      data-size={size}
    >
      <svg {...svgStyleProps} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.22" />
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="42 57"
        >
          {animated ? (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="0.8s"
              repeatCount="indefinite"
            />
          ) : null}
        </circle>
      </svg>
    </span>
  );
}

export type { SpinnerSize } from './Spinner.styles';
