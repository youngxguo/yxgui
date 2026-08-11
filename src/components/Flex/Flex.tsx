import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { spacing } from '../../theme/foundations.stylex';

type Spacing = 'sm' | 'md' | 'lg';

type FlexProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  direction?: 'row' | 'column';
  gap?: Spacing;
  padding?: Spacing;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between';
  wrap?: boolean;
  minHeight?: 'viewport';
};

const styles = stylex.create({
  root: {
    display: 'flex'
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  gapSm: {
    gap: spacing.sm
  },
  gapMd: {
    gap: spacing.md
  },
  gapLg: {
    gap: spacing.lg
  },
  paddingSm: {
    padding: spacing.sm
  },
  paddingMd: {
    padding: spacing.md
  },
  paddingLg: {
    padding: spacing.lg
  },
  alignStart: {
    alignItems: 'flex-start'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignEnd: {
    alignItems: 'flex-end'
  },
  alignStretch: {
    alignItems: 'stretch'
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  justifySpaceBetween: {
    justifyContent: 'space-between'
  },
  noWrap: {
    flexWrap: 'nowrap'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  viewport: {
    minHeight: '100dvh'
  }
});

const directionStyles = {
  row: styles.row,
  column: styles.column
};

const gapStyles = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg
};

const paddingStyles = {
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg
};

const alignStyles = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch
};

const justifyStyles = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  'space-between': styles.justifySpaceBetween
};

export function Flex({
  direction = 'row',
  gap,
  padding,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  minHeight,
  ...props
}: FlexProps) {
  return (
    <div
      {...props}
      {...stylex.props(
        styles.root,
        directionStyles[direction],
        gap ? gapStyles[gap] : null,
        padding ? paddingStyles[padding] : null,
        alignStyles[align],
        justifyStyles[justify],
        wrap ? styles.wrap : styles.noWrap,
        minHeight === 'viewport' ? styles.viewport : null
      )}
    />
  );
}
