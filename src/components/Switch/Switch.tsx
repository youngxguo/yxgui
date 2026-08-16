import * as stylex from '@stylexjs/stylex';
import { useState, type ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { radii } from '../../theme/foundations.stylex';

export type SwitchProps = Omit<
  ComponentProps<'button'>,
  'aria-checked' | 'children' | 'className' | 'role' | 'style' | 'type'
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: 'sm' | 'md';
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.borderMuted,
    borderRadius: radii.full,
    borderStyle: 'solid',
    borderWidth: '1px',
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed'
    },
    display: 'inline-flex',
    flexShrink: 0,
    margin: 0,
    padding: '2px',
    transitionDuration: '160ms',
    transitionProperty: 'background-color, border-color'
  },
  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  disabled: {
    opacity: 0.5
  },
  sm: {
    height: '20px',
    width: '36px'
  },
  md: {
    height: '24px',
    width: '44px'
  },
  thumb: {
    backgroundColor: colors.controlThumb,
    borderRadius: radii.full,
    display: 'block',
    transitionDuration: '160ms',
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-out'
  },
  thumbSm: {
    height: '14px',
    width: '14px'
  },
  thumbMd: {
    height: '18px',
    width: '18px'
  },
  thumbCheckedSm: {
    transform: 'translateX(16px)'
  },
  thumbCheckedMd: {
    transform: 'translateX(20px)'
  }
});

export function Switch({
  checked,
  defaultChecked = false,
  disabled = false,
  onCheckedChange,
  onClick,
  size = 'md',
  ...props
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = checked ?? uncontrolledChecked;

  return (
    <button
      {...props}
      aria-checked={isChecked}
      data-state={isChecked ? 'checked' : 'unchecked'}
      disabled={disabled}
      role="switch"
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) {
          return;
        }

        const nextChecked = !isChecked;
        if (!isControlled) {
          setUncontrolledChecked(nextChecked);
        }
        onCheckedChange?.(nextChecked);
      }}
      {...stylex.props(
        styles.root,
        styles[size],
        isChecked && styles.checked,
        disabled && styles.disabled
      )}
    >
      <span
        aria-hidden="true"
        {...stylex.props(
          styles.thumb,
          size === 'sm' ? styles.thumbSm : styles.thumbMd,
          isChecked && (size === 'sm' ? styles.thumbCheckedSm : styles.thumbCheckedMd)
        )}
      />
    </button>
  );
}
