import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';

export type SeparatorProps = Omit<ComponentProps<'div'>, 'className' | 'role' | 'style'> & {
  decorative?: boolean;
  orientation?: 'horizontal' | 'vertical';
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.borderMuted,
    flexShrink: 0
  },
  horizontal: {
    height: '1px',
    width: '100%'
  },
  vertical: {
    alignSelf: 'stretch',
    minHeight: '24px',
    width: '1px'
  }
});

export function Separator({
  decorative = false,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) {
  return (
    <div
      {...props}
      aria-hidden={decorative || undefined}
      aria-orientation={decorative ? undefined : orientation}
      role={decorative ? undefined : 'separator'}
      {...stylex.props(styles.root, styles[orientation])}
    />
  );
}
