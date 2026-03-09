import { createElement, type HTMLAttributes, type Ref } from 'react';
import {
  getGridStyleProps,
  type GridAlign,
  type GridGap,
  type GridJustify,
  type GridPadding,
  type GridTemplateColumns,
  type GridTemplateRows
} from './Grid.styles';

export type GridElement =
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

export interface GridProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  ref?: Ref<HTMLElement>;
  as?: GridElement;
  columns?: GridTemplateColumns;
  rows?: GridTemplateRows;
  align?: GridAlign;
  justify?: GridJustify;
  inline?: boolean;
  gap?: GridGap;
  padding?: GridPadding;
}

export function Grid({
  ref,
  as,
  columns,
  rows,
  align = 'stretch',
  justify = 'stretch',
  inline = false,
  gap,
  padding,
  className,
  ...props
}: GridProps) {
  const styleProps = getGridStyleProps({
    columns,
    rows,
    align,
    justify,
    inline,
    gap,
    padding,
    className
  });
  const Component = as ?? 'div';

  return createElement(Component, {
    ...props,
    ...styleProps,
    ref,
    'data-align': align,
    'data-justify': justify,
    'data-inline': inline || undefined
  });
}

export type {
  GridAlign,
  GridGap,
  GridJustify,
  GridPadding,
  GridTrackCount,
  GridTemplateColumns,
  GridTemplateRows
} from './Grid.styles';
