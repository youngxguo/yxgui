import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens/foundationTokens.stylex';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexAlignContent =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'between'
  | 'around'
  | 'evenly';

const flexGapTokens = {
  xxxs: spacingTokens.xxxs,
  xxs: spacingTokens.xxs,
  xs: spacingTokens.xs,
  sm: spacingTokens.sm,
  md: spacingTokens.md,
  lg: spacingTokens.lg,
  xl: spacingTokens.xl
} as const;

export type FlexGap = keyof typeof flexGapTokens;
export type FlexPadding = keyof typeof flexGapTokens;
export type FlexBasisToken = keyof typeof flexGapTokens;
type CSSFlexBasis = NonNullable<CSSProperties['flexBasis']>;
type CSSFlex = NonNullable<CSSProperties['flex']>;
export type FlexBasis = FlexBasisToken | CSSFlexBasis;
export type FlexGrow = number | string;
export type FlexShrink = number | string;
export type FlexValue = CSSFlex;

interface GetFlexStylePropsOptions {
  direction: FlexDirection;
  align: FlexAlign;
  justify: FlexJustify;
  wrap: FlexWrap;
  alignContent: FlexAlignContent;
  inline: boolean;
  gap?: FlexGap;
  rowGap?: FlexGap;
  columnGap?: FlexGap;
  padding?: FlexPadding;
  basis?: FlexBasis;
  grow?: FlexGrow;
  shrink?: FlexShrink;
  flex?: FlexValue;
  className?: string;
  style?: CSSProperties;
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
  alignContentStart: {
    alignContent: 'flex-start'
  },
  alignContentEnd: {
    alignContent: 'flex-end'
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

const alignContentStyles: Record<FlexAlignContent, unknown> = {
  start: flexStyles.alignContentStart,
  end: flexStyles.alignContentEnd,
  center: flexStyles.alignContentCenter,
  stretch: flexStyles.alignContentStretch,
  between: flexStyles.alignContentBetween,
  around: flexStyles.alignContentAround,
  evenly: flexStyles.alignContentEvenly
};

const wrapStyles: Record<FlexWrap, unknown> = {
  nowrap: flexStyles.nowrap,
  wrap: flexStyles.wrap,
  'wrap-reverse': flexStyles.wrapReverse
};

function getGapStyle({
  gap,
  rowGap,
  columnGap
}: Pick<GetFlexStylePropsOptions, 'gap' | 'rowGap' | 'columnGap'>): CSSProperties | undefined {
  const gapStyle: CSSProperties = {};

  if (gap != null) {
    gapStyle.gap = flexGapTokens[gap];
  }

  if (rowGap != null) {
    gapStyle.rowGap = flexGapTokens[rowGap];
  }

  if (columnGap != null) {
    gapStyle.columnGap = flexGapTokens[columnGap];
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

function isFlexBasisToken(value: FlexBasis): value is FlexBasisToken {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(flexGapTokens, value);
}

function getBasisStyle({
  basis
}: Pick<GetFlexStylePropsOptions, 'basis'>): CSSProperties | undefined {
  if (basis == null) {
    return undefined;
  }

  return {
    flexBasis: isFlexBasisToken(basis) ? flexGapTokens[basis] : basis
  };
}

function getFlexSizingStyle({
  basis,
  grow,
  shrink,
  flex
}: Pick<GetFlexStylePropsOptions, 'basis' | 'grow' | 'shrink' | 'flex'>):
  | CSSProperties
  | undefined {
  if (flex != null) {
    return { flex };
  }

  const basisStyle = getBasisStyle({ basis });
  const sizingStyle: CSSProperties = basisStyle != null ? { ...basisStyle } : {};

  if (grow != null) {
    sizingStyle.flexGrow = grow;
  }

  if (shrink != null) {
    sizingStyle.flexShrink = shrink;
  }

  return Object.keys(sizingStyle).length > 0 ? sizingStyle : undefined;
}

export function getFlexStyleProps({
  direction,
  align,
  justify,
  wrap,
  alignContent,
  inline,
  gap,
  rowGap,
  columnGap,
  padding,
  basis,
  grow,
  shrink,
  flex,
  className,
  style
}: GetFlexStylePropsOptions) {
  const tokenGapStyle = getGapStyle({ gap, rowGap, columnGap });
  const paddingStyle = getPaddingStyle({ padding });
  const sizingStyle = getFlexSizingStyle({ basis, grow, shrink, flex });
  const tokenStyle =
    tokenGapStyle != null || paddingStyle != null || sizingStyle != null
      ? { ...tokenGapStyle, ...paddingStyle, ...sizingStyle }
      : undefined;
  const mergedStyle = tokenStyle != null || style != null ? { ...tokenStyle, ...style } : undefined;

  return composeStyleProps(
    [
      flexStyles.root,
      inline ? flexStyles.inline : null,
      pickStyle(directionStyles, direction),
      pickStyle(alignStyles, align),
      pickStyle(justifyStyles, justify),
      pickStyle(alignContentStyles, alignContent),
      pickStyle(wrapStyles, wrap)
    ],
    { className, style: mergedStyle }
  );
}
