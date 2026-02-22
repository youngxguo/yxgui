import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref
} from 'react';
import {
  getRadioGroupStyleProps,
  getRadioInputStyleProps,
  getRadioLabelStyleProps,
  getRadioTextStyleProps,
  type RadioGroupOrientation,
  type RadioSize
} from './RadioGroup.styles';

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  invalid: boolean;
  disabled: boolean;
  size: RadioSize;
  setValue: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: RadioGroupOrientation;
  size?: RadioSize;
  invalid?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, BaseStyleProps {
  ref?: Ref<HTMLInputElement>;
  value: string;
  label?: ReactNode;
  size?: RadioSize;
}

export function RadioGroup({
  ref,
  name,
  value,
  defaultValue,
  onValueChange,
  orientation = 'vertical',
  size = 'md',
  invalid = false,
  disabled = false,
  className,
  style,
  children,
  ...props
}: RadioGroupProps) {
  const generatedName = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : uncontrolledValue;

  const contextValue = useMemo<RadioGroupContextValue>(
    () => ({
      name: name ?? generatedName,
      value: selectedValue,
      invalid,
      disabled,
      size,
      setValue: (nextValue) => {
        if (disabled) {
          return;
        }
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
      }
    }),
    [disabled, generatedName, invalid, isControlled, name, onValueChange, selectedValue, size]
  );

  const styleProps = getRadioGroupStyleProps(orientation, { className, style });

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div {...props} {...styleProps} ref={ref} role="radiogroup" aria-invalid={invalid}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export function Radio({
  ref,
  value,
  label,
  children,
  size,
  disabled,
  className,
  style,
  onChange,
  ...props
}: RadioProps) {
  const group = useRadioGroupContext();
  const resolvedSize = size ?? group?.size ?? 'md';
  const resolvedDisabled = Boolean(disabled ?? group?.disabled);
  const checked = group ? group.value === value : props.checked;
  const inputStyleProps = getRadioInputStyleProps(resolvedSize);
  const labelStyleProps = getRadioLabelStyleProps(resolvedDisabled, { className, style });
  const textStyleProps = getRadioTextStyleProps(resolvedSize);
  const labelContent = label ?? children;

  return (
    <label {...labelStyleProps}>
      <input
        {...props}
        {...inputStyleProps}
        ref={ref}
        type="radio"
        value={value}
        name={group?.name ?? props.name}
        checked={checked}
        disabled={resolvedDisabled}
        aria-invalid={group?.invalid || props['aria-invalid'] ? true : undefined}
        onChange={(event) => {
          if (group) {
            group.setValue(event.currentTarget.value);
          }
          onChange?.(event);
        }}
      />
      {labelContent ? <span {...textStyleProps}>{labelContent}</span> : null}
    </label>
  );
}
