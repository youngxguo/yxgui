import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type Ref
} from 'react';
import { Input } from '../Input/Input';
import { Typography } from '../Typography/Typography';
import { getDataPresenceAttribute } from '../_internal/dataAttributes';
import { useControllableState } from '../_internal/useControllableState';
import {
  getInputOtpGroupStyleProps,
  getInputOtpRootStyleProps,
  getInputOtpSeparatorStyleProps,
  getInputOtpSlotStyleProps
} from './InputOTP.styles';

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

interface InputOtpContextValue {
  length: number;
  chars: string[];
  disabled: boolean;
  setAt: (index: number, char: string) => void;
  setRangeFrom: (index: number, text: string) => void;
  clearAt: (index: number) => void;
  focusIndex: (index: number) => void;
  registerSlot: (index: number, node: HTMLInputElement | null) => void;
}

const InputOtpContext = createContext<InputOtpContextValue | null>(null);

function useInputOtpContext(componentName: string) {
  const context = useContext(InputOtpContext);
  if (!context) {
    throw new Error(`${componentName} must be used within InputOTP`);
  }
  return context;
}

function sanitizeInput(text: string) {
  return text.replace(/\s+/g, '');
}

function splitValue(value: string, length: number) {
  return Array.from({ length }, (_, index) => value[index] ?? '');
}

export interface InputOTPProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

export interface InputOTPGroupProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface InputOTPSlotProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue'>,
    BaseStyleProps {
  ref?: Ref<HTMLInputElement>;
  index: number;
}

export interface InputOTPSeparatorProps extends HTMLAttributes<HTMLSpanElement>, BaseStyleProps {
  ref?: Ref<HTMLSpanElement>;
}

function getStyleOptions({ className, style }: BaseStyleProps) {
  return { className, style };
}

export function InputOTP({
  ref,
  length = 6,
  value,
  defaultValue = '',
  onValueChange,
  disabled = false,
  className,
  style,
  children,
  ...props
}: InputOTPProps) {
  const normalizedLength = Math.max(1, length);
  const [currentValue, setCurrentValue] = useControllableState<string>({
    value,
    defaultValue,
    onChange: onValueChange
  });
  const slotsRef = useRef<Array<HTMLInputElement | null>>([]);

  const normalizedValue = sanitizeInput(currentValue).slice(0, normalizedLength);
  const chars = useMemo(
    () => splitValue(normalizedValue, normalizedLength),
    [normalizedLength, normalizedValue]
  );

  const updateChars = (nextChars: string[]) => {
    setCurrentValue(nextChars.join('').slice(0, normalizedLength));
  };

  const contextValue: InputOtpContextValue = {
    length: normalizedLength,
    chars,
    disabled,
    setAt: (index, char) => {
      const nextChars = [...chars];
      nextChars[index] = char.slice(0, 1);
      updateChars(nextChars);
    },
    setRangeFrom: (index, text) => {
      const nextChars = [...chars];
      const pasted = Array.from(sanitizeInput(text)).slice(0, normalizedLength - index);
      pasted.forEach((char, pastedIndex) => {
        nextChars[index + pastedIndex] = char;
      });
      updateChars(nextChars);
    },
    clearAt: (index) => {
      const nextChars = [...chars];
      nextChars[index] = '';
      updateChars(nextChars);
    },
    focusIndex: (index) => {
      slotsRef.current[index]?.focus();
      slotsRef.current[index]?.select();
    },
    registerSlot: (index, node) => {
      slotsRef.current[index] = node;
    }
  };

  const styleProps = getInputOtpRootStyleProps(getStyleOptions({ className, style }));

  return (
    <InputOtpContext.Provider value={contextValue}>
      <div {...props} {...styleProps} ref={ref} data-disabled={getDataPresenceAttribute(disabled)}>
        {children ?? (
          <InputOTPGroup>
            {Array.from({ length: normalizedLength }, (_, index) => (
              <InputOTPSlot key={index} index={index} aria-label={`Digit ${index + 1}`} />
            ))}
          </InputOTPGroup>
        )}
      </div>
    </InputOtpContext.Provider>
  );
}

export function InputOTPGroup({ ref, className, style, ...props }: InputOTPGroupProps) {
  const styleProps = getInputOtpGroupStyleProps(getStyleOptions({ className, style }));
  return <div {...props} {...styleProps} ref={ref} />;
}

export function InputOTPSlot({
  ref,
  index,
  className,
  style,
  onChange,
  onKeyDown,
  onPaste,
  onFocus,
  inputMode = 'numeric',
  autoComplete = 'one-time-code',
  disabled,
  ...props
}: InputOTPSlotProps) {
  const context = useInputOtpContext('InputOTPSlot');
  const styleProps = getInputOtpSlotStyleProps(getStyleOptions({ className, style }));
  const isDisabled = context.disabled || disabled;
  const slotValue = context.chars[index] ?? '';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextChar = sanitizeInput(event.currentTarget.value).slice(-1);
    context.setAt(index, nextChar);
    if (nextChar && index < context.length - 1) {
      context.focusIndex(index + 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (slotValue) {
        context.clearAt(index);
      } else if (index > 0) {
        context.clearAt(index - 1);
        context.focusIndex(index - 1);
      }
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      context.focusIndex(index - 1);
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowRight' && index < context.length - 1) {
      context.focusIndex(index + 1);
      event.preventDefault();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const text = event.clipboardData.getData('text');
    if (!text) {
      return;
    }
    context.setRangeFrom(index, text);
    const pastedCount = Array.from(sanitizeInput(text)).length;
    const nextFocusIndex = Math.min(index + Math.max(0, pastedCount - 1), context.length - 1);
    context.focusIndex(nextFocusIndex);
    event.preventDefault();
  };

  return (
    <Input
      {...props}
      {...styleProps}
      size="lg"
      ref={(node) => {
        context.registerSlot(index, node);
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as { current: HTMLInputElement | null }).current = node;
        }
      }}
      type="text"
      inputMode={inputMode}
      autoComplete={autoComplete}
      maxLength={1}
      disabled={isDisabled}
      value={slotValue}
      onChange={(event) => {
        handleChange(event);
        onChange?.(event);
      }}
      onKeyDown={(event) => {
        handleKeyDown(event);
        onKeyDown?.(event);
      }}
      onPaste={(event) => {
        handlePaste(event);
        onPaste?.(event);
      }}
      onFocus={(event) => {
        event.currentTarget.select();
        onFocus?.(event);
      }}
    />
  );
}

export function InputOTPSeparator({
  ref,
  className,
  style,
  children = '-',
  ...props
}: InputOTPSeparatorProps) {
  const styleProps = getInputOtpSeparatorStyleProps(getStyleOptions({ className, style }));
  return (
    <Typography
      {...props}
      {...styleProps}
      ref={ref as Ref<HTMLElement>}
      as="span"
      variant="muted"
      aria-hidden={props['aria-hidden'] ?? true}
    >
      {children}
    </Typography>
  );
}
