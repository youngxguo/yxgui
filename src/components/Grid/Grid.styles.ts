import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens/foundationTokens.stylex';

export type GridAlign = 'start' | 'end' | 'center' | 'stretch';
export type GridJustify = 'start' | 'end' | 'center' | 'stretch';
export type GridAlignContent =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'between'
  | 'around'
  | 'evenly';
export type GridJustifyContent = GridAlignContent;
export type GridAutoFlow = 'row' | 'column' | 'row-dense' | 'column-dense';

const gridSpacingTokens = {
  xxxs: spacingTokens.xxxs,
  xxs: spacingTokens.xxs,
  xs: spacingTokens.xs,
  sm: spacingTokens.sm,
  md: spacingTokens.md,
  lg: spacingTokens.lg,
  xl: spacingTokens.xl
} as const;

export type GridGap = keyof typeof gridSpacingTokens;
export type GridPadding = keyof typeof gridSpacingTokens;
type CSSGridTemplateColumns = NonNullable<CSSProperties['gridTemplateColumns']>;
type CSSGridTemplateRows = NonNullable<CSSProperties['gridTemplateRows']>;
type CSSGridTrackSize = NonNullable<CSSProperties['gridAutoRows']>;
type CSSGridAreas = NonNullable<CSSProperties['gridTemplateAreas']>;
export type GridTemplateColumns = number | CSSGridTemplateColumns;
export type GridTemplateRows = number | CSSGridTemplateRows;
export type GridTrackSize = CSSGridTrackSize;
export type GridAreas = CSSGridAreas;

interface GetGridStylePropsOptions {
  align: GridAlign;
  justify: GridJustify;
  alignContent: GridAlignContent;
  justifyContent: GridJustifyContent;
  autoFlow: GridAutoFlow;
  inline: boolean;
  columns?: GridTemplateColumns;
  rows?: GridTemplateRows;
  autoRows?: GridTrackSize;
  autoColumns?: GridTrackSize;
  areas?: GridAreas;
  gap?: GridGap;
  rowGap?: GridGap;
  columnGap?: GridGap;
  padding?: GridPadding;
  className?: string;
  style?: CSSProperties;
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
  },
  alignContentStart: {
    alignContent: 'start'
  },
  alignContentEnd: {
    alignContent: 'end'
  },
  alignContentCenter: {
    alignContent: 'center'
  },
  alignContentStretch: {
    alignContent: 'stretch'
  },
  alignContentBetween: {
    alignContent: 'space-between'
  },
  alignContentAround: {
    alignContent: 'space-around'
  },
  alignContentEvenly: {
    alignContent: 'space-evenly'
  },
  justifyContentStart: {
    justifyContent: 'start'
  },
  justifyContentEnd: {
    justifyContent: 'end'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  justifyContentStretch: {
    justifyContent: 'stretch'
  },
  justifyContentBetween: {
    justifyContent: 'space-between'
  },
  justifyContentAround: {
    justifyContent: 'space-around'
  },
  justifyContentEvenly: {
    justifyContent: 'space-evenly'
  },
  autoFlowRow: {
    gridAutoFlow: 'row'
  },
  autoFlowColumn: {
    gridAutoFlow: 'column'
  },
  autoFlowRowDense: {
    gridAutoFlow: 'row dense'
  },
  autoFlowColumnDense: {
    gridAutoFlow: 'column dense'
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

const alignContentStyles: Record<GridAlignContent, unknown> = {
  start: gridStyles.alignContentStart,
  end: gridStyles.alignContentEnd,
  center: gridStyles.alignContentCenter,
  stretch: gridStyles.alignContentStretch,
  between: gridStyles.alignContentBetween,
  around: gridStyles.alignContentAround,
  evenly: gridStyles.alignContentEvenly
};

const justifyContentStyles: Record<GridJustifyContent, unknown> = {
  start: gridStyles.justifyContentStart,
  end: gridStyles.justifyContentEnd,
  center: gridStyles.justifyContentCenter,
  stretch: gridStyles.justifyContentStretch,
  between: gridStyles.justifyContentBetween,
  around: gridStyles.justifyContentAround,
  evenly: gridStyles.justifyContentEvenly
};

const autoFlowStyles: Record<GridAutoFlow, unknown> = {
  row: gridStyles.autoFlowRow,
  column: gridStyles.autoFlowColumn,
  'row-dense': gridStyles.autoFlowRowDense,
  'column-dense': gridStyles.autoFlowColumnDense
};

function getGapStyle({
  gap,
  rowGap,
  columnGap
}: Pick<GetGridStylePropsOptions, 'gap' | 'rowGap' | 'columnGap'>): CSSProperties | undefined {
  const gapStyle: CSSProperties = {};

  if (gap != null) {
    gapStyle.gap = gridSpacingTokens[gap];
  }

  if (rowGap != null) {
    gapStyle.rowGap = gridSpacingTokens[rowGap];
  }

  if (columnGap != null) {
    gapStyle.columnGap = gridSpacingTokens[columnGap];
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
  if (typeof template === 'number') {
    const trackCount = Number.isFinite(template) ? Math.max(1, Math.floor(template)) : 1;
    return `repeat(${trackCount}, minmax(0, 1fr))`;
  }

  return String(template);
}

function getTemplateStyle({
  columns,
  rows,
  autoRows,
  autoColumns,
  areas
}: Pick<GetGridStylePropsOptions, 'columns' | 'rows' | 'autoRows' | 'autoColumns' | 'areas'>):
  | CSSProperties
  | undefined {
  const templateStyle: CSSProperties = {};

  if (columns != null) {
    templateStyle.gridTemplateColumns = resolveTemplate(columns);
  }

  if (rows != null) {
    templateStyle.gridTemplateRows = resolveTemplate(rows);
  }

  if (autoRows != null) {
    templateStyle.gridAutoRows = autoRows;
  }

  if (autoColumns != null) {
    templateStyle.gridAutoColumns = autoColumns;
  }

  if (areas != null) {
    templateStyle.gridTemplateAreas = areas;
  }

  return Object.keys(templateStyle).length > 0 ? templateStyle : undefined;
}

export function getGridStyleProps({
  align,
  justify,
  alignContent,
  justifyContent,
  autoFlow,
  inline,
  columns,
  rows,
  autoRows,
  autoColumns,
  areas,
  gap,
  rowGap,
  columnGap,
  padding,
  className,
  style
}: GetGridStylePropsOptions) {
  const tokenGapStyle = getGapStyle({ gap, rowGap, columnGap });
  const paddingStyle = getPaddingStyle({ padding });
  const templateStyle = getTemplateStyle({ columns, rows, autoRows, autoColumns, areas });
  const tokenStyle =
    tokenGapStyle != null || paddingStyle != null || templateStyle != null
      ? { ...tokenGapStyle, ...paddingStyle, ...templateStyle }
      : undefined;
  const mergedStyle = tokenStyle != null || style != null ? { ...tokenStyle, ...style } : undefined;

  return composeStyleProps(
    [
      gridStyles.root,
      inline ? gridStyles.inline : null,
      pickStyle(alignStyles, align),
      pickStyle(justifyStyles, justify),
      pickStyle(alignContentStyles, alignContent),
      pickStyle(justifyContentStyles, justifyContent),
      pickStyle(autoFlowStyles, autoFlow)
    ],
    { className, style: mergedStyle }
  );
}
