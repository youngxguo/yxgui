import type { Ref, TextareaHTMLAttributes } from 'react';
import { getTextareaStyleProps, type TextareaSize } from './Textarea.styles';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  ref?: Ref<HTMLTextAreaElement>;
  size?: TextareaSize;
  invalid?: boolean;
}

export function Textarea({
  ref,
  size = 'md',
  invalid = false,
  className,
  style,
  'aria-invalid': ariaInvalidProp,
  rows = 4,
  ...props
}: TextareaProps) {
  const styleProps = getTextareaStyleProps({ size, invalid, className, style });
  const ariaInvalid = invalid ? true : ariaInvalidProp;

  return <textarea {...props} {...styleProps} ref={ref} aria-invalid={ariaInvalid} rows={rows} />;
}
