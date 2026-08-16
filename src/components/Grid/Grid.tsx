import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { spacing } from '../../theme/foundations.stylex';

type Spacing = 'sm' | 'md' | 'lg';

export type GridProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  align?: 'start' | 'center' | 'end' | 'stretch';
  columns?: 1 | 2 | 3 | 4 | 'auto-sm' | 'auto-md' | 'auto-lg';
  gap?: Spacing;
  padding?: Spacing;
};

export type GridItemProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  align?: 'start' | 'center' | 'end' | 'stretch';
  columnSpan?: 1 | 2 | 3 | 4 | 'full';
};

const styles = stylex.create({
  root: {
    alignItems: 'stretch',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)'
  },
  columns2: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
  columns3: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
  columns4: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
  autoSm: { gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))' },
  autoMd: { gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' },
  autoLg: { gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' },
  alignStart: { alignItems: 'start' },
  alignCenter: { alignItems: 'center' },
  alignEnd: { alignItems: 'end' },
  item: { boxSizing: 'border-box', minWidth: 0 },
  span2: { gridColumn: 'span 2 / span 2' },
  span3: { gridColumn: 'span 3 / span 3' },
  span4: { gridColumn: 'span 4 / span 4' },
  spanFull: { gridColumn: '1 / -1' },
  selfStart: { alignSelf: 'start' },
  selfCenter: { alignSelf: 'center' },
  selfEnd: { alignSelf: 'end' },
  selfStretch: { alignSelf: 'stretch' }
});

const gapStyles = stylex.create({
  sm: { gap: spacing.sm },
  md: { gap: spacing.md },
  lg: { gap: spacing.lg }
});

const paddingStyles = stylex.create({
  sm: { padding: spacing.sm },
  md: { padding: spacing.md },
  lg: { padding: spacing.lg }
});

const columnStyles = {
  1: null,
  2: styles.columns2,
  3: styles.columns3,
  4: styles.columns4,
  'auto-sm': styles.autoSm,
  'auto-md': styles.autoMd,
  'auto-lg': styles.autoLg
} as const;

const alignStyles = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: null
} as const;

const spanStyles = {
  1: null,
  2: styles.span2,
  3: styles.span3,
  4: styles.span4,
  full: styles.spanFull
} as const;

const selfAlignStyles = {
  start: styles.selfStart,
  center: styles.selfCenter,
  end: styles.selfEnd,
  stretch: styles.selfStretch
} as const;

export function Grid({ align = 'stretch', columns = 1, gap, padding, ...props }: GridProps) {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.root,
        columnStyles[columns],
        alignStyles[align],
        gap && gapStyles[gap],
        padding && paddingStyles[padding]
      )}
    />
  );
}

export function GridItem({ align, columnSpan = 1, ...props }: GridItemProps) {
  return (
    <div
      {...props}
      {...stylex.props(styles.item, spanStyles[columnSpan], align && selfAlignStyles[align])}
    />
  );
}
