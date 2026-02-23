import { useState } from 'react';

interface UseControllableStateOptions<T> {
  /** External state source for controlled usage. */
  value?: T;
  /** Initial internal state used when `value` is not provided. */
  defaultValue: T;
  /** Change notification for both controlled and uncontrolled flows. */
  onChange?: (value: T) => void;
}

/**
 * Shared controlled/uncontrolled state helper for component primitives.
 *
 * The setter accepts the next resolved value (not an updater function).
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange
}: UseControllableStateOptions<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = (nextValue: T) => {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onChange?.(nextValue);
  };

  return [currentValue, setValue] as const;
}
