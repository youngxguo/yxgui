import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens/foundationTokens.stylex';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

const flexGapTokens = {
  xs: spacingTokens.xs,
  sm: spacingTokens.sm,
  md: spacingTokens.md,
  lg: spacingTokens.lg,
  xl: spacingTokens.xl
} as const;

export type FlexGap = keyof typeof flexGapTokens;
export type FlexPadding = keyof typeof flexGapTokens;

interface GetFlexStylePropsOptions {
  direction: FlexDirection;
  align: FlexAlign;
  justify: FlexJustify;
  wrap: FlexWrap;
  inline: boolean;
  gap?: FlexGap;
  padding?: FlexPadding;
  className?: string;
}

const flexStyles = stylex.create({
  root: {
    display: 'flex'
  },
  inline: {
    display: 'inline-flex'
  },
  row: {
    flexDirection: 'row'
  },
  rowReverse: {
    flexDirection: 'row-reverse'
  },
  column: {
    flexDirection: 'column'
  },
  columnReverse: {
    flexDirection: 'column-reverse'
  },
  alignStart: {
    alignItems: 'flex-start'
  },
  alignEnd: {
    alignItems: 'flex-end'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignStretch: {
    alignItems: 'stretch'
  },
  alignBaseline: {
    alignItems: 'baseline'
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyBetween: {
    justifyContent: 'space-between'
  },
  justifyAround: {
    justifyContent: 'space-around'
  },
  justifyEvenly: {
    justifyContent: 'space-evenly'
  },
  nowrap: {
    flexWrap: 'nowrap'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  wrapReverse: {
    flexWrap: 'wrap-reverse'
  }
});

const directionStyles: Record<FlexDirection, unknown> = {
  row: flexStyles.row,
  'row-reverse': flexStyles.rowReverse,
  column: flexStyles.column,
  'column-reverse': flexStyles.columnReverse
};

const alignStyles: Record<FlexAlign, unknown> = {
  start: flexStyles.alignStart,
  end: flexStyles.alignEnd,
  center: flexStyles.alignCenter,
  stretch: flexStyles.alignStretch,
  baseline: flexStyles.alignBaseline
};

const justifyStyles: Record<FlexJustify, unknown> = {
  start: flexStyles.justifyStart,
  end: flexStyles.justifyEnd,
  center: flexStyles.justifyCenter,
  between: flexStyles.justifyBetween,
  around: flexStyles.justifyAround,
  evenly: flexStyles.justifyEvenly
};

const wrapStyles: Record<FlexWrap, unknown> = {
  nowrap: flexStyles.nowrap,
  wrap: flexStyles.wrap,
  'wrap-reverse': flexStyles.wrapReverse
};

function getGapStyle({ gap }: Pick<GetFlexStylePropsOptions, 'gap'>): CSSProperties | undefined {
  const gapStyle: CSSProperties = {};

  if (gap != null) {
    gapStyle.gap = flexGapTokens[gap];
  }

  return Object.keys(gapStyle).length > 0 ? gapStyle : undefined;
}

function getPaddingStyle({
  padding
}: Pick<GetFlexStylePropsOptions, 'padding'>): CSSProperties | undefined {
  const paddingStyle: CSSProperties = {};

  if (padding != null) {
    paddingStyle.padding = flexGapTokens[padding];
  }

  return Object.keys(paddingStyle).length > 0 ? paddingStyle : undefined;
}
export function getFlexStyleProps({
  direction,
  align,
  justify,
  wrap,
  inline,
  gap,
  padding,
  className
}: GetFlexStylePropsOptions) {
  const tokenGapStyle = getGapStyle({ gap });
  const paddingStyle = getPaddingStyle({ padding });
  const tokenStyle =
    tokenGapStyle != null || paddingStyle != null
      ? { ...tokenGapStyle, ...paddingStyle }
      : undefined;

  return composeStyleProps(
    [
      flexStyles.root,
      inline ? flexStyles.inline : null,
      pickStyle(directionStyles, direction),
      pickStyle(alignStyles, align),
      pickStyle(justifyStyles, justify),
      pickStyle(wrapStyles, wrap)
    ],
    { className, style: tokenStyle }
  );
}
