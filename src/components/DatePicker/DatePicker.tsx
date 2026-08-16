import { Popover as BasePopover } from '@base-ui/react/popover';
import * as stylex from '@stylexjs/stylex';
import { useEffect, useId, useRef, useState, type ComponentProps, type Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';
import { Calendar } from '../Calendar';
import { useThemePortalContainer } from '../Theme/Theme';

export type DatePickerProps = Omit<ComponentProps<'div'>, 'children' | 'className' | 'style'> & {
  defaultOpen?: boolean;
  defaultValue?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  form?: string;
  fullWidth?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  label: string;
  locale?: string;
  max?: string;
  min?: string;
  name?: string;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  open?: boolean;
  placeholder?: string;
  value?: string;
  weekStartsOn?: 0 | 1;
};

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseDate(value: string | undefined) {
  const match = value?.match(ISO_DATE);
  if (!match) return undefined;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.toISOString().slice(0, 10) === value ? date : undefined;
}

function assignRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

const styles = stylex.create({
  field: {
    display: 'grid',
    gap: spacing.sm,
    maxWidth: '100%',
    width: '320px'
  },
  fullWidth: { width: '100%' },
  label: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: { default: colors.surface, ':disabled': colors.surfaceDisabled },
    borderColor: { default: colors.border, ':disabled': colors.borderDisabled },
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    gap: spacing.md,
    justifyContent: 'space-between',
    lineHeight: lineHeights.sm,
    minHeight: '38px',
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '1px',
    paddingBlock: spacing.md,
    paddingInline: spacing.md,
    textAlign: 'left',
    width: '100%'
  },
  invalid: { borderColor: colors.danger },
  placeholder: { color: colors.textMuted },
  caret: { color: colors.textMuted, fontSize: fontSizes.xs },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  error: {
    color: colors.danger,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  positioner: { zIndex: 1100 },
  popup: {
    boxShadow: '0 12px 36px rgba(17, 24, 39, 0.2)',
    opacity: 1,
    outline: 'none',
    transform: 'scale(1)',
    transformOrigin: 'var(--transform-origin)',
    transition: 'opacity 120ms ease, transform 120ms ease'
  },
  transition: { opacity: 0, transform: 'scale(0.98)' }
});

export function DatePicker({
  defaultOpen = false,
  defaultValue,
  description,
  disabled = false,
  error,
  form,
  fullWidth = false,
  inputRef,
  label,
  locale = 'en-US',
  max,
  min,
  name,
  onOpenChange,
  onValueChange,
  open,
  placeholder = 'Choose a date',
  ref,
  value,
  weekStartsOn = 0,
  ...props
}: DatePickerProps) {
  const container = useThemePortalContainer();
  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const valueId = `${generatedId}-value`;
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;
  const hiddenInput = useRef<HTMLInputElement | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const currentValue = value ?? uncontrolledValue;
  const currentOpen = open ?? uncontrolledOpen;
  const describedBy = [description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ');
  const parsedValue = parseDate(currentValue);
  const displayValue = parsedValue
    ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(parsedValue)
    : undefined;

  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    const owningForm = hiddenInput.current?.form;
    const reset = () => {
      if (value === undefined) setUncontrolledValue(defaultValue);
      if (open === undefined) setUncontrolledOpen(false);
    };
    owningForm?.addEventListener('reset', reset);
    return () => owningForm?.removeEventListener('reset', reset);
  }, [defaultValue, open, value]);

  return (
    <div
      {...props}
      ref={(node) => assignRef(ref, node)}
      {...stylex.props(styles.field, fullWidth && styles.fullWidth)}
    >
      <span id={labelId} {...stylex.props(styles.label)}>
        {label}
      </span>
      <input
        disabled={disabled}
        form={form}
        name={name}
        ref={(node) => {
          hiddenInput.current = node;
          assignRef(inputRef, node);
        }}
        type="hidden"
        value={currentValue ?? ''}
      />
      <BasePopover.Root open={currentOpen} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        <BasePopover.Trigger
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          aria-labelledby={`${labelId} ${valueId}`}
          className={stylex.props(styles.trigger, Boolean(error) && styles.invalid).className}
          disabled={disabled}
        >
          <span id={valueId} {...stylex.props(!displayValue && styles.placeholder)}>
            {displayValue ?? placeholder}
          </span>
          <span aria-hidden="true" {...stylex.props(styles.caret)}>
            ▼
          </span>
        </BasePopover.Trigger>
        <BasePopover.Portal container={container}>
          <BasePopover.Positioner
            align="start"
            className={stylex.props(styles.positioner).className}
            sideOffset={8}
          >
            <BasePopover.Popup
              aria-label={`${label} calendar`}
              className={stylex.props(styles.popup).className}
            >
              <Calendar
                disabled={disabled}
                label={`${label} calendar grid`}
                locale={locale}
                max={max}
                min={min}
                value={currentValue}
                weekStartsOn={weekStartsOn}
                onValueChange={(nextValue) => {
                  if (value === undefined) setUncontrolledValue(nextValue);
                  onValueChange?.(nextValue);
                  setOpen(false);
                }}
              />
            </BasePopover.Popup>
          </BasePopover.Positioner>
        </BasePopover.Portal>
      </BasePopover.Root>
      {description ? (
        <p id={descriptionId} {...stylex.props(styles.description)}>
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} {...stylex.props(styles.error)}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
