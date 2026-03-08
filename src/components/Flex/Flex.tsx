import { createElement, type HTMLAttributes, type Ref } from 'react';
import {
  getFlexStyleProps,
  type FlexAlign,
  type FlexAlignContent,
  type FlexBasis,
  type FlexDirection,
  type FlexGrow,
  type FlexGap,
  type FlexJustify,
  type FlexShrink,
  type FlexValue,
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
  alignContent?: FlexAlignContent;
  inline?: boolean;
  gap?: FlexGap;
  rowGap?: FlexGap;
  columnGap?: FlexGap;
  basis?: FlexBasis;
  grow?: FlexGrow;
  shrink?: FlexShrink;
  flex?: FlexValue;
}

export function Flex({
  ref,
  as,
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  wrap = 'nowrap',
  alignContent = 'stretch',
  inline = false,
  gap,
  rowGap,
  columnGap,
  basis,
  grow,
  shrink,
  flex,
  className,
  style,
  ...props
}: FlexProps) {
  const styleProps = getFlexStyleProps({
    direction,
    align,
    justify,
    wrap,
    alignContent,
    inline,
    gap,
    rowGap,
    columnGap,
    basis,
    grow,
    shrink,
    flex,
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
    'data-align-content': alignContent,
    'data-wrap': wrap
  });
}

export type {
  FlexAlign,
  FlexAlignContent,
  FlexBasis,
  FlexDirection,
  FlexGrow,
  FlexGap,
  FlexJustify,
  FlexShrink,
  FlexValue,
  FlexWrap
} from './Flex.styles';
