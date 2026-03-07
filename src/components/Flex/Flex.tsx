import { createElement, type HTMLAttributes, type Ref } from 'react';
import {
  getFlexStyleProps,
  type FlexAlign,
  type FlexDirection,
  type FlexGap,
  type FlexJustify,
  type FlexWrap
} from './Flex.styles';

export type FlexElement =
  | 'article'
  | 'aside'
  | 'div'
  | 'footer'
  | 'form'
  | 'header'
  | 'li'
  | 'main'
  | 'nav'
  | 'ol'
  | 'section'
  | 'span'
  | 'ul';

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  as?: FlexElement;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  inline?: boolean;
  gap?: FlexGap;
  rowGap?: FlexGap;
  columnGap?: FlexGap;
}

export function Flex({
  ref,
  as,
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  wrap = 'nowrap',
  inline = false,
  gap,
  rowGap,
  columnGap,
  className,
  style,
  ...props
}: FlexProps) {
  const styleProps = getFlexStyleProps({
    direction,
    align,
    justify,
    wrap,
    inline,
    gap,
    rowGap,
    columnGap,
    className,
    style
  });
  const Component = as ?? 'div';

  return createElement(Component, {
    ...props,
    ...styleProps,
    ref,
    'data-align': align,
    'data-direction': direction,
    'data-inline': inline || undefined,
    'data-justify': justify,
    'data-wrap': wrap
  });
}

export type { FlexAlign, FlexDirection, FlexGap, FlexJustify, FlexWrap } from './Flex.styles';
