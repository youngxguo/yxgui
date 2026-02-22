import { createElement, type HTMLAttributes, type Ref } from 'react';
import { getTypographyStyleProps, type TypographyVariant } from './Typography.styles';

export type TypographyElement =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'small'
  | 'code'
  | 'blockquote';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  as?: TypographyElement;
  variant?: TypographyVariant;
}

const defaultElementByVariant: Record<TypographyVariant, TypographyElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  text: 'p',
  lead: 'p',
  muted: 'p',
  small: 'small',
  code: 'code',
  blockquote: 'blockquote'
};

export function Typography({
  ref,
  as,
  variant = 'text',
  className,
  style,
  ...props
}: TypographyProps) {
  const styleProps = getTypographyStyleProps({ variant, className, style });
  const Component = as ?? defaultElementByVariant[variant];

  return createElement(Component, { ...props, ...styleProps, ref });
}

export type { TypographyVariant } from './Typography.styles';
