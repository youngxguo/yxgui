import { useState, type ButtonHTMLAttributes, type Ref } from 'react';
import { getDataPresenceAttribute, getDataStateAttribute } from '../_internal/dataAttributes';
import { getToggleStyleProps, type ToggleSize, type ToggleVariant } from './Toggle.styles';

export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'type'
> {
  ref?: Ref<HTMLButtonElement>;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
}

export function Toggle({
  ref,
  pressed,
  defaultPressed = false,
  onPressedChange,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  className,
  style,
  onClick,
  ...props
}: ToggleProps) {
  const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const isPressed = isControlled ? pressed : uncontrolledPressed;

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    const nextPressed = !isPressed;
    if (!isControlled) {
      setUncontrolledPressed(nextPressed);
    }
    onPressedChange?.(nextPressed);
  };

  const styleProps = getToggleStyleProps({
    variant,
    size,
    pressed: isPressed,
    disabled,
    className,
    style
  });

  return (
    <button
      {...props}
      {...styleProps}
      ref={ref}
      type="button"
      disabled={disabled}
      aria-pressed={isPressed}
      data-state={getDataStateAttribute(isPressed, 'on', 'off')}
      data-disabled={getDataPresenceAttribute(disabled)}
      onClick={(event) => {
        handleToggle();
        onClick?.(event);
      }}
    />
  );
}
