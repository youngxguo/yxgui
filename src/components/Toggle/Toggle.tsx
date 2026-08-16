import * as stylex from '@stylexjs/stylex';
import { useState, type ComponentProps, type MouseEvent } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, radii, spacing } from '../../theme/foundations.stylex';

export type ToggleProps = Omit<
  ComponentProps<'button'>,
  'aria-pressed' | 'className' | 'style' | 'type'
> & {
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  pressed?: boolean;
  size?: 'sm' | 'md';
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

export function Toggle({
  defaultPressed = false,
  onClick,
  onPressedChange,
  pressed,
  size = 'md',
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const isPressed = pressed ?? internalPressed;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const nextPressed = !isPressed;
    if (!isControlled) setInternalPressed(nextPressed);
    onPressedChange?.(nextPressed);
  }

  return (
    <button
      {...props}
      aria-pressed={isPressed}
      data-state={isPressed ? 'on' : 'off'}
      onClick={handleClick}
      type="button"
      {...stylex.props(styles.root, styles[size], isPressed && styles.pressed)}
    />
  );
}
