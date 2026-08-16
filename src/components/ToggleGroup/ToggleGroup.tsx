import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import * as stylex from '@stylexjs/stylex';
import type { Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import { radii, spacing } from '../../theme/foundations.stylex';

export type ToggleGroupProps = Omit<BaseToggleGroup.Props, 'className' | 'render' | 'style'> & {
  ref?: Ref<HTMLDivElement>;
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'inline-flex',
    gap: spacing.sm,
    padding: spacing.sm
  },
  vertical: { alignItems: 'stretch', flexDirection: 'column' }
});

export function ToggleGroup({ orientation = 'horizontal', ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      {...props}
      orientation={orientation}
      className={stylex.props(styles.root, orientation === 'vertical' && styles.vertical).className}
    />
  );
}
