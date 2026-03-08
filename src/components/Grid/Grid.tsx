import { createElement, type HTMLAttributes, type Ref } from 'react';
import {
  getGridStyleProps,
  type GridAlign,
  type GridAlignContent,
  type GridAreas,
  type GridAutoFlow,
  type GridGap,
  type GridJustify,
  type GridJustifyContent,
  type GridPadding,
  type GridTemplateColumns,
  type GridTemplateRows,
  type GridTrackSize
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

export interface GridProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  as?: GridElement;
  columns?: GridTemplateColumns;
  rows?: GridTemplateRows;
  autoRows?: GridTrackSize;
  autoColumns?: GridTrackSize;
  areas?: GridAreas;
  align?: GridAlign;
  justify?: GridJustify;
  alignContent?: GridAlignContent;
  justifyContent?: GridJustifyContent;
  autoFlow?: GridAutoFlow;
  inline?: boolean;
  gap?: GridGap;
  rowGap?: GridGap;
  columnGap?: GridGap;
  padding?: GridPadding;
}

export function Grid({
  ref,
  as,
  columns,
  rows,
  autoRows,
  autoColumns,
  areas,
  align = 'stretch',
  justify = 'stretch',
  alignContent = 'stretch',
  justifyContent = 'stretch',
  autoFlow = 'row',
  inline = false,
  gap,
  rowGap,
  columnGap,
  padding,
  className,
  style,
  ...props
}: GridProps) {
  const styleProps = getGridStyleProps({
    columns,
    rows,
    autoRows,
    autoColumns,
    areas,
    align,
    justify,
    alignContent,
    justifyContent,
    autoFlow,
    inline,
    gap,
    rowGap,
    columnGap,
    padding,
    className,
    style
  });
  const Component = as ?? 'div';

  return createElement(Component, {
    ...props,
    ...styleProps,
    ref,
    'data-align': align,
    'data-justify': justify,
    'data-align-content': alignContent,
    'data-justify-content': justifyContent,
    'data-auto-flow': autoFlow,
    'data-inline': inline || undefined
  });
}

export type {
  GridAlign,
  GridAlignContent,
  GridAreas,
  GridAutoFlow,
  GridGap,
  GridJustify,
  GridJustifyContent,
  GridPadding,
  GridTemplateColumns,
  GridTemplateRows,
  GridTrackSize
} from './Grid.styles';
