import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { spacing } from '../../theme/foundations.stylex';

type CheckboxProps = Omit<ComponentProps<'input'>, 'className' | 'style' | 'type'>;

const styles = stylex.create({
  root: {
    accentColor: colors.primary,
    flexShrink: 0,
    height: spacing.xl,
    margin: 0,
    width: spacing.xl
  }
});

export function Checkbox(props: CheckboxProps) {
  return <input {...props} type="checkbox" {...stylex.props(styles.root)} />;
}
