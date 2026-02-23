import type { CSSProperties, InputHTMLAttributes, KeyboardEvent, Ref } from 'react';
import { getDataPresenceAttribute } from '../_internal/dataAttributes';
import { useControllableState } from '../_internal/useControllableState';
import { getSliderStyleProps } from './Slider.styles';

export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'value' | 'defaultValue' | 'min' | 'max' | 'step'
> {
  ref?: Ref<HTMLInputElement>;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  style?: CSSProperties;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getStepValue(step?: number) {
  return typeof step === 'number' && step > 0 ? step : 1;
}

export function Slider({
  ref,
  value,
  defaultValue = 0,
  onValueChange,
  onChange,
  onInput,
  onKeyDown,
  min = 0,
  max = 100,
  step = 1,
  className,
  style,
  disabled = false,
  ...props
}: SliderProps) {
  const [currentValue, setCurrentValue] = useControllableState<number>({
    value,
    defaultValue,
    onChange: onValueChange
  });
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) && max > safeMin ? max : safeMin + 100;
  const safeStep = getStepValue(step);
  const styleProps = getSliderStyleProps({ className, style });

  const updateValue = (next: number) => setCurrentValue(clamp(next, safeMin, safeMax));

  const handleRangeChange = (rawValue: string) => {
    const parsed = Number(rawValue);
    if (Number.isFinite(parsed)) {
      updateValue(parsed);
    }
  };

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    let nextValue: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      nextValue = currentValue + safeStep;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      nextValue = currentValue - safeStep;
    } else if (event.key === 'Home') {
      nextValue = safeMin;
    } else if (event.key === 'End') {
      nextValue = safeMax;
    }

    if (nextValue !== null) {
      updateValue(nextValue);
      event.preventDefault();
    }
  };

  return (
    <input
      {...props}
      {...styleProps}
      ref={ref}
      type="range"
      min={safeMin}
      max={safeMax}
      step={safeStep}
      disabled={disabled}
      value={currentValue}
      data-disabled={getDataPresenceAttribute(disabled)}
      onChange={(event) => {
        handleRangeChange(event.currentTarget.value);
        onChange?.(event);
      }}
      onInput={(event) => {
        handleRangeChange((event.currentTarget as HTMLInputElement).value);
        onInput?.(event);
      }}
      onKeyDown={(event) => {
        handleKey(event);
        onKeyDown?.(event);
      }}
    />
  );
}
