import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { radii, spacing } from '../../theme/foundations.stylex';

type CardProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: colors.text,
    padding: spacing.lg
  }
});

export function Card(props: CardProps) {
  return <div {...props} {...stylex.props(styles.root)} />;
}
