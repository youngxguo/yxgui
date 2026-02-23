import { useId, useState, type ButtonHTMLAttributes, type Ref } from 'react';
import { getDataPresenceAttribute, getDataStateAttribute } from '../_internal/dataAttributes';
import {
  getSwitchRootStyleProps,
  getSwitchThumbStyleProps,
  type SwitchSize
} from './Switch.styles';

export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'role' | 'type'
> {
  ref?: Ref<HTMLButtonElement>;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
}

export function Switch({
  ref,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = 'md',
  className,
  style,
  id,
  onClick,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolledChecked;

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    const nextChecked = !isChecked;
    if (!isControlled) {
      setUncontrolledChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked);
  };

  const rootStyleProps = getSwitchRootStyleProps({
    size,
    checked: isChecked,
    disabled,
    className,
    style
  });
  const thumbStyleProps = getSwitchThumbStyleProps(size, isChecked);

  return (
    <button
      {...props}
      {...rootStyleProps}
      ref={ref}
      id={id ?? generatedId}
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      data-state={getDataStateAttribute(isChecked, 'checked', 'unchecked')}
      data-disabled={getDataPresenceAttribute(disabled)}
      onClick={(event) => {
        handleToggle();
        onClick?.(event);
      }}
    >
      <span {...thumbStyleProps} aria-hidden="true" />
    </button>
  );
}
