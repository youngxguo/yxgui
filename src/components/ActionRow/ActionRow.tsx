import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { spacing } from '../../theme/foundations.stylex';

export type ActionRowProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  align?: 'start' | 'end' | 'space-between';
  stack?: 'never' | 'responsive';
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md,
    width: '100%'
  },
  responsive: {
    alignItems: { default: 'stretch', '@media (min-width: 640px)': 'center' },
    flexDirection: { default: 'column-reverse', '@media (min-width: 640px)': 'row' },
    flexWrap: { default: 'nowrap', '@media (min-width: 640px)': 'wrap' }
  },
  start: { justifyContent: 'flex-start' },
  end: { justifyContent: 'flex-end' },
  between: { justifyContent: 'space-between' },
  responsiveStart: {
    justifyContent: { default: 'flex-start', '@media (min-width: 640px)': 'flex-start' }
  },
  responsiveEnd: {
    justifyContent: { default: 'flex-start', '@media (min-width: 640px)': 'flex-end' }
  },
  responsiveBetween: {
    justifyContent: { default: 'flex-start', '@media (min-width: 640px)': 'space-between' }
  }
});

const alignmentStyles = {
  start: styles.start,
  end: styles.end,
  'space-between': styles.between
} as const;

const responsiveAlignmentStyles = {
  start: styles.responsiveStart,
  end: styles.responsiveEnd,
  'space-between': styles.responsiveBetween
} as const;

export function ActionRow({ align = 'end', stack = 'responsive', ...props }: ActionRowProps) {
  const responsive = stack === 'responsive';
  return (
    <div
      {...props}
      {...stylex.props(
        styles.root,
        responsive && styles.responsive,
        responsive ? responsiveAlignmentStyles[align] : alignmentStyles[align]
      )}
    />
  );
}
