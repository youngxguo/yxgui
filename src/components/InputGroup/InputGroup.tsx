import { Input as BaseInput } from '@base-ui/react/input';
import * as stylex from '@stylexjs/stylex';
import { createContext, useContext, type ComponentProps, type Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type InputGroupProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  disabled?: boolean;
  fullWidth?: boolean;
  invalid?: boolean;
};

export type InputGroupInputProps = Omit<BaseInput.Props, 'className' | 'render' | 'style'> & {
  ref?: Ref<HTMLInputElement>;
};

export type InputGroupAddonProps = Omit<ComponentProps<'span'>, 'className' | 'style'> & {
  side?: 'start' | 'end';
};

export type InputGroupButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'> & {
  side?: 'start' | 'end';
};

type InputGroupContextValue = { disabled: boolean; invalid: boolean };

const InputGroupContext = createContext<InputGroupContextValue>({
  disabled: false,
  invalid: false
});

const styles = stylex.create({
  root: {
    alignItems: 'stretch',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    display: 'flex',
    maxWidth: '100%',
    minHeight: '38px',
    overflow: 'hidden',
    outline: { default: 'none', ':focus-within': `2px solid ${colors.primary}` },
    outlineOffset: '1px',
    width: '320px'
  },
  fullWidth: { width: '100%' },
  invalid: { borderColor: colors.danger },
  disabled: { backgroundColor: colors.surfaceDisabled, borderColor: colors.borderDisabled },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: { default: colors.text, ':disabled': colors.textDisabled },
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minWidth: 0,
    outline: 'none',
    paddingBlock: spacing.md,
    paddingInline: spacing.md,
    '::placeholder': { color: colors.textMuted }
  },
  addon: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    color: colors.textMuted,
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingInline: spacing.md,
    whiteSpace: 'nowrap'
  },
  startDivider: {
    borderColor: colors.borderMuted,
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: '1px'
  },
  endDivider: {
    borderColor: colors.borderMuted,
    borderInlineStartStyle: 'solid',
    borderInlineStartWidth: '1px'
  },
  disabledText: { color: colors.textDisabled },
  button: {
    alignItems: 'center',
    backgroundColor: { default: 'transparent', ':enabled:hover': colors.surfaceSubtle },
    borderBlockWidth: 0,
    borderColor: colors.borderMuted,
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    paddingInline: spacing.md
  },
  startButton: {
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: '1px',
    borderInlineStartWidth: 0
  },
  endButton: {
    borderInlineEndWidth: 0,
    borderInlineStartStyle: 'solid',
    borderInlineStartWidth: '1px'
  }
});

export function InputGroup({
  disabled = false,
  fullWidth = false,
  invalid = false,
  ...props
}: InputGroupProps) {
  return (
    <InputGroupContext.Provider value={{ disabled, invalid }}>
      <div
        {...props}
        aria-disabled={disabled || undefined}
        {...stylex.props(
          styles.root,
          fullWidth && styles.fullWidth,
          invalid && styles.invalid,
          disabled && styles.disabled
        )}
      />
    </InputGroupContext.Provider>
  );
}

export function InputGroupInput({
  'aria-invalid': ariaInvalid,
  disabled,
  ref,
  ...props
}: InputGroupInputProps) {
  const group = useContext(InputGroupContext);
  const inputDisabled = group.disabled || disabled;
  const inputInvalid =
    group.invalid ||
    (ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== 'false');
  return (
    <BaseInput
      {...props}
      aria-invalid={inputInvalid || undefined}
      className={stylex.props(styles.input).className}
      disabled={inputDisabled}
      ref={ref as Ref<HTMLElement>}
    />
  );
}

export function InputGroupAddon({ side = 'start', ...props }: InputGroupAddonProps) {
  const { disabled } = useContext(InputGroupContext);
  return (
    <span
      {...props}
      {...stylex.props(
        styles.addon,
        side === 'start' ? styles.startDivider : styles.endDivider,
        disabled && styles.disabledText
      )}
    />
  );
}

export function InputGroupButton({
  disabled,
  side = 'end',
  type = 'button',
  ...props
}: InputGroupButtonProps) {
  const group = useContext(InputGroupContext);
  return (
    <button
      {...props}
      disabled={group.disabled || disabled}
      type={type}
      {...stylex.props(styles.button, side === 'start' ? styles.startButton : styles.endButton)}
    />
  );
}
