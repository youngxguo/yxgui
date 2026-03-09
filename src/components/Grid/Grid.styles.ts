import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens/foundationTokens.stylex';

export type GridAlign = 'start' | 'end' | 'center' | 'stretch';
export type GridJustify = 'start' | 'end' | 'center' | 'stretch';

const gridSpacingTokens = {
  xs: spacingTokens.xs,
  sm: spacingTokens.sm,
  md: spacingTokens.md,
  lg: spacingTokens.lg,
  xl: spacingTokens.xl
} as const;

export type GridGap = keyof typeof gridSpacingTokens;
export type GridPadding = keyof typeof gridSpacingTokens;
export type GridTrackCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridTemplateColumns = GridTrackCount;
export type GridTemplateRows = GridTrackCount;

interface GetGridStylePropsOptions {
  align: GridAlign;
  justify: GridJustify;
  inline: boolean;
  columns?: GridTemplateColumns;
  rows?: GridTemplateRows;
  gap?: GridGap;
  padding?: GridPadding;
  className?: string;
}

const gridStyles = stylex.create({
  root: {
    display: 'grid'
  },
  inline: {
    display: 'inline-grid'
  },
  alignStart: {
    alignItems: 'start'
  },
  alignEnd: {
    alignItems: 'end'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignStretch: {
    alignItems: 'stretch'
  },
  justifyStart: {
    justifyItems: 'start'
  },
  justifyEnd: {
    justifyItems: 'end'
  },
  justifyCenter: {
    justifyItems: 'center'
  },
  justifyStretch: {
    justifyItems: 'stretch'
  }
});

const alignStyles: Record<GridAlign, unknown> = {
  start: gridStyles.alignStart,
  end: gridStyles.alignEnd,
  center: gridStyles.alignCenter,
  stretch: gridStyles.alignStretch
};

const justifyStyles: Record<GridJustify, unknown> = {
  start: gridStyles.justifyStart,
  end: gridStyles.justifyEnd,
  center: gridStyles.justifyCenter,
  stretch: gridStyles.justifyStretch
};

function getGapStyle({ gap }: Pick<GetGridStylePropsOptions, 'gap'>): CSSProperties | undefined {
  const gapStyle: CSSProperties = {};

  if (gap != null) {
    gapStyle.gap = gridSpacingTokens[gap];
  }

  return Object.keys(gapStyle).length > 0 ? gapStyle : undefined;
}

function getPaddingStyle({
  padding
}: Pick<GetGridStylePropsOptions, 'padding'>): CSSProperties | undefined {
  const paddingStyle: CSSProperties = {};

  if (padding != null) {
    paddingStyle.padding = gridSpacingTokens[padding];
  }

  return Object.keys(paddingStyle).length > 0 ? paddingStyle : undefined;
}

function resolveTemplate(template: GridTemplateColumns | GridTemplateRows): string {
  return `repeat(${template}, minmax(0, 1fr))`;
}

function getTemplateStyle({
  columns,
  rows
}: Pick<GetGridStylePropsOptions, 'columns' | 'rows'>): CSSProperties | undefined {
  const templateStyle: CSSProperties = {};

  if (columns != null) {
    templateStyle.gridTemplateColumns = resolveTemplate(columns);
  }

  if (rows != null) {
    templateStyle.gridTemplateRows = resolveTemplate(rows);
  }

  return Object.keys(templateStyle).length > 0 ? templateStyle : undefined;
}

export function getGridStyleProps({
  align,
  justify,
  inline,
  columns,
  rows,
  gap,
  padding,
  className
}: GetGridStylePropsOptions) {
  const tokenGapStyle = getGapStyle({ gap });
  const paddingStyle = getPaddingStyle({ padding });
  const templateStyle = getTemplateStyle({ columns, rows });
  const tokenStyle =
    tokenGapStyle != null || paddingStyle != null || templateStyle != null
      ? { ...tokenGapStyle, ...paddingStyle, ...templateStyle }
      : undefined;

  return composeStyleProps(
    [
      gridStyles.root,
      inline ? gridStyles.inline : null,
      pickStyle(alignStyles, align),
      pickStyle(justifyStyles, justify)
    ],
    { className, style: tokenStyle }
  );
}
