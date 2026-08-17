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

export type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
export type InputGroupAddonProps = Omit<ComponentProps<'span'>, 'className' | 'style'> & {
  align?: InputGroupAddonAlign;
  side?: 'start' | 'end';
};

export type InputGroupButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'> & {
  side?: 'start' | 'end';
};
export type InputGroupTextareaProps = Omit<ComponentProps<'textarea'>, 'className' | 'style'>;
export type InputGroupTextProps = Omit<ComponentProps<'span'>, 'className' | 'style'>;

type InputGroupContextValue = { disabled: boolean; invalid: boolean };

const InputGroupContext = createContext<InputGroupContextValue>({
  disabled: false,
  invalid: false
});
const InputGroupAddonContext = createContext<InputGroupAddonAlign | null>(null);

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
    flexWrap: 'wrap',
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
    order: 0,
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
  inlineStart: {
    borderColor: colors.borderMuted,
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: '1px',
    order: -1
  },
  inlineEnd: {
    borderColor: colors.borderMuted,
    borderInlineStartStyle: 'solid',
    borderInlineStartWidth: '1px',
    order: 1
  },
  blockStart: {
    borderBlockEndColor: colors.borderMuted,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: '1px',
    flexBasis: '100%',
    justifyContent: 'space-between',
    order: -2,
    paddingBlock: spacing.md,
    whiteSpace: 'normal'
  },
  blockEnd: {
    borderBlockStartColor: colors.borderMuted,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: '1px',
    flexBasis: '100%',
    justifyContent: 'space-between',
    order: 2,
    paddingBlock: spacing.md,
    whiteSpace: 'normal'
  },
  disabledText: { color: colors.textDisabled },
  textarea: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: { default: colors.text, ':disabled': colors.textDisabled },
    flexBasis: '100%',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minHeight: '96px',
    minWidth: 0,
    order: 0,
    outline: 'none',
    padding: spacing.md,
    resize: 'vertical',
    width: '100%',
    '::placeholder': { color: colors.textMuted }
  },
  text: {
    color: 'inherit',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm
  },
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
  },
  embeddedButton: {
    borderRadius: radii.sm,
    borderWidth: 0,
    minHeight: '28px',
    paddingBlock: spacing.sm
  }
});

function hasInvalidState(value: InputGroupInputProps['aria-invalid']) {
  return value !== undefined && value !== false && value !== 'false';
}

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
  const inputInvalid = group.invalid || hasInvalidState(ariaInvalid);
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

export function InputGroupTextarea({
  'aria-invalid': ariaInvalid,
  disabled,
  ref,
  ...props
}: InputGroupTextareaProps) {
  const group = useContext(InputGroupContext);
  const textareaDisabled = group.disabled || disabled;
  const textareaInvalid = group.invalid || hasInvalidState(ariaInvalid);
  return (
    <textarea
      {...props}
      aria-invalid={textareaInvalid || undefined}
      disabled={textareaDisabled}
      ref={ref}
      {...stylex.props(styles.textarea)}
    />
  );
}

export function InputGroupAddon({
  align,
  children,
  side = 'start',
  ...props
}: InputGroupAddonProps) {
  const { disabled } = useContext(InputGroupContext);
  const resolvedAlign = align ?? (side === 'start' ? 'inline-start' : 'inline-end');
  const alignStyle =
    resolvedAlign === 'inline-start'
      ? styles.inlineStart
      : resolvedAlign === 'inline-end'
        ? styles.inlineEnd
        : resolvedAlign === 'block-start'
          ? styles.blockStart
          : styles.blockEnd;
  return (
    <InputGroupAddonContext.Provider value={resolvedAlign}>
      <span {...props} {...stylex.props(styles.addon, alignStyle, disabled && styles.disabledText)}>
        {children}
      </span>
    </InputGroupAddonContext.Provider>
  );
}

export function InputGroupText(props: InputGroupTextProps) {
  return <span {...props} {...stylex.props(styles.text)} />;
}

export function InputGroupButton({
  disabled,
  side = 'end',
  type = 'button',
  ...props
}: InputGroupButtonProps) {
  const group = useContext(InputGroupContext);
  const addonAlign = useContext(InputGroupAddonContext);
  return (
    <button
      {...props}
      disabled={group.disabled || disabled}
      type={type}
      {...stylex.props(
        styles.button,
        addonAlign
          ? styles.embeddedButton
          : side === 'start'
            ? styles.startButton
            : styles.endButton
      )}
    />
  );
}
