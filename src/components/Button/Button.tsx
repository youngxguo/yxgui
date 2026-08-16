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
import { actionVariantStyles } from '../actionStyles.stylex';
import { ButtonGroupContext } from '../ButtonGroup/buttonGroupContext';

export type ButtonSize = 'sm' | 'md';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'> & {
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const styles = stylex.create({
  root: {
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    alignItems: 'center',
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    gap: spacing.sm,
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '2px'
  },
  sm: { paddingBlock: spacing.sm, paddingInline: spacing.md },
  md: { paddingBlock: spacing.md, paddingInline: spacing.lg },
  fullWidth: { width: '100%' },
  grouped: {
    borderRadius: 0,
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.text}` },
    outlineOffset: '-3px'
  },
  groupVertical: { width: '100%' },
  groupFullWidth: { flex: 1 }
});

export function Button({
  disabled,
  fullWidth = false,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const group = useContext(ButtonGroupContext);
  return (
    <button
      {...props}
      disabled={group.disabled || disabled}
      {...stylex.props(
        styles.root,
        actionVariantStyles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        group.attached && styles.grouped,
        group.orientation === 'vertical' && styles.groupVertical,
        group.fullWidth && styles.groupFullWidth
      )}
    />
  );
}
