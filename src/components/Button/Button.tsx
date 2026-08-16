import * as stylex from '@stylexjs/stylex';
import { useContext, type ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';
import { ButtonGroupContext } from '../ButtonGroup/buttonGroupContext';

export type ButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    backgroundColor: {
      default: colors.primary,
      ':enabled:hover': colors.primaryHover,
      ':disabled': colors.surfaceDisabled
    },
    borderColor: {
      default: 'transparent',
      ':disabled': colors.borderDisabled
    },
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: {
      default: colors.onEmphasis,
      ':disabled': colors.textDisabled
    },
    alignItems: 'center',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    gap: spacing.sm,
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.lg
  },
  grouped: {
    borderRadius: 0,
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.onEmphasis}` },
    outlineOffset: '-3px'
  },
  groupVertical: { width: '100%' },
  groupFullWidth: { flex: 1 }
});

export function Button({ disabled, ...props }: ButtonProps) {
  const group = useContext(ButtonGroupContext);
  return (
    <button
      {...props}
      disabled={group.disabled || disabled}
      {...stylex.props(
        styles.root,
        group.attached && styles.grouped,
        group.orientation === 'vertical' && styles.groupVertical,
        group.fullWidth && styles.groupFullWidth
      )}
    />
  );
}
