import type { Ref, TextareaHTMLAttributes } from 'react';
import { getDataPresenceAttribute, isAriaBooleanTrue } from '../_internal/dataAttributes';
import { getTextareaStyleProps, type TextareaSize } from './Textarea.styles';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  ref?: Ref<HTMLTextAreaElement>;
  size?: TextareaSize;
  invalid?: boolean;
}

export function Textarea({
  ref,
  size = 'md',
  invalid: invalidProp = false,
  disabled = false,
  className,
  style,
  'aria-invalid': ariaInvalidProp,
  rows = 4,
  ...props
}: TextareaProps) {
  const invalid = invalidProp || isAriaBooleanTrue(ariaInvalidProp);
  const styleProps = getTextareaStyleProps({ size, invalid, className, style });
  const ariaInvalid = invalid ? true : undefined;

  return (
    <textarea
      {...props}
      {...styleProps}
      ref={ref}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      rows={rows}
      data-invalid={getDataPresenceAttribute(invalid)}
      data-disabled={getDataPresenceAttribute(disabled)}
    />
  );
}
