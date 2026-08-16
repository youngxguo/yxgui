import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { radii, spacing } from '../../theme/foundations.stylex';
import { ButtonGroupContext } from './buttonGroupContext';

export type ButtonGroupProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  attached?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  orientation?: 'horizontal' | 'vertical';
};

const styles = stylex.create({
  root: { alignItems: 'stretch', display: 'inline-flex' },
  horizontal: { flexDirection: 'row' },
  vertical: { flexDirection: 'column' },
  attached: {
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    gap: '1px',
    overflow: 'hidden'
  },
  detached: { gap: spacing.sm },
  fullWidth: { display: 'flex', width: '100%' }
});

export function ButtonGroup({
  attached = true,
  disabled = false,
  fullWidth = false,
  orientation = 'horizontal',
  role = 'group',
  ...props
}: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={{ attached, disabled, fullWidth, orientation }}>
      <div
        {...props}
        aria-disabled={disabled || undefined}
        role={role}
        {...stylex.props(
          styles.root,
          orientation === 'horizontal' ? styles.horizontal : styles.vertical,
          attached ? styles.attached : styles.detached,
          fullWidth && styles.fullWidth
        )}
      />
    </ButtonGroupContext.Provider>
  );
}
