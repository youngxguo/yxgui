import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import * as stylex from '@stylexjs/stylex';
import type { Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, radii, spacing } from '../../theme/foundations.stylex';

export type ToggleProps = Omit<BaseToggle.Props, 'className' | 'render' | 'style'> & {
  size?: 'sm' | 'md';
  ref?: Ref<HTMLButtonElement>;
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceSubtle,
      ':disabled': 'transparent'
    },
    borderColor: 'transparent',
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    justifyContent: 'center',
    paddingInline: spacing.md
  },
  pressed: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.borderMuted,
    color: colors.primary
  },
  sm: { minHeight: '28px' },
  md: { minHeight: '36px' }
});

export function Toggle({ size = 'md', ...props }: ToggleProps) {
  return (
    <BaseToggle
      {...props}
      className={(state) =>
        stylex.props(styles.root, styles[size], state.pressed && styles.pressed).className
      }
    />
  );
}
