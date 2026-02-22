import type { LabelHTMLAttributes, Ref } from 'react';
import { getLabelStyleProps, type LabelSize } from './Label.styles';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  ref?: Ref<HTMLLabelElement>;
  size?: LabelSize;
  required?: boolean;
}

export function Label({
  ref,
  size = 'md',
  required = false,
  className,
  style,
  children,
  ...props
}: LabelProps) {
  const styleProps = getLabelStyleProps({ size, className, style });

  return (
    <label {...props} {...styleProps} ref={ref}>
      {children}
      {required ? <span aria-hidden="true"> *</span> : null}
    </label>
  );
}
