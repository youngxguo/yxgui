import * as stylex from '@stylexjs/stylex';
import { useContext, type ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';
import { ButtonGroupContext } from './buttonGroupContext';

export type ButtonGroupProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  attached?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  orientation?: 'horizontal' | 'vertical';
};
export type ButtonGroupSeparatorProps = Omit<
  ComponentProps<'span'>,
  'children' | 'className' | 'style'
>;
export type ButtonGroupTextProps = Omit<ComponentProps<'span'>, 'className' | 'style'>;

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
  fullWidth: { display: 'flex', width: '100%' },
  separator: { backgroundColor: colors.borderMuted, flexShrink: 0 },
  horizontalSeparator: { alignSelf: 'stretch', marginInline: '-1px', width: '1px' },
  verticalSeparator: { height: '1px', marginBlock: '-1px', width: '100%' },
  text: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    color: colors.textMuted,
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.lg
  },
  disabledText: { color: colors.textDisabled },
  verticalText: { justifyContent: 'center', width: '100%' },
  fullWidthText: { flex: 1, justifyContent: 'center' }
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

export function ButtonGroupSeparator({
  'aria-orientation': ariaOrientation,
  role = 'separator',
  ...props
}: ButtonGroupSeparatorProps) {
  const group = useContext(ButtonGroupContext);
  const orientation = group.orientation === 'horizontal' ? 'vertical' : 'horizontal';
  return (
    <span
      {...props}
      aria-orientation={ariaOrientation ?? orientation}
      role={role}
      {...stylex.props(
        styles.separator,
        group.orientation === 'horizontal' ? styles.horizontalSeparator : styles.verticalSeparator
      )}
    />
  );
}

export function ButtonGroupText(props: ButtonGroupTextProps) {
  const group = useContext(ButtonGroupContext);
  return (
    <span
      {...props}
      aria-disabled={group.disabled || undefined}
      {...stylex.props(
        styles.text,
        group.disabled && styles.disabledText,
        group.orientation === 'vertical' && styles.verticalText,
        group.fullWidth && styles.fullWidthText
      )}
    />
  );
}
