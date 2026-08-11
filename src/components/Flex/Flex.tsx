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
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start'
  },
  column: {
    flexDirection: 'column'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  viewport: {
    minHeight: '100dvh'
  }
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

const alignStyles = stylex.create({
  start: { alignItems: 'flex-start' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' }
});

const justifyStyles = stylex.create({
  center: { justifyContent: 'center' },
  end: { justifyContent: 'flex-end' },
  'space-between': { justifyContent: 'space-between' }
});

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
        direction === 'column' && styles.column,
        gap && gapStyles[gap],
        padding && paddingStyles[padding],
        align !== 'stretch' && alignStyles[align],
        justify !== 'start' && justifyStyles[justify],
        wrap && styles.wrap,
        minHeight === 'viewport' && styles.viewport
      )}
    />
  );
}
