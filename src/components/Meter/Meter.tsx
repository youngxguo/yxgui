import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';

export type MeterProps = Omit<ComponentProps<'meter'>, 'className' | 'style'> & {
  fullWidth?: boolean;
};

const styles = stylex.create({
  root: {
    accentColor: colors.primary,
    height: '12px'
  },
  fullWidth: { width: '100%' }
});

export function Meter({ fullWidth = false, ...props }: MeterProps) {
  return <meter {...props} {...stylex.props(styles.root, fullWidth && styles.fullWidth)} />;
}
