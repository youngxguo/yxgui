import {
  createContext,
  useContext,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type Ref
} from 'react';
import { useControllableState } from '../_internal/useControllableState';
import { getToggleStyleProps, type ToggleSize, type ToggleVariant } from '../Toggle/Toggle.styles';
import {
  getToggleGroupItemStyleProps,
  getToggleGroupRootStyleProps,
  type ToggleGroupOrientation
} from './ToggleGroup.styles';

type ToggleGroupType = 'single' | 'multiple';

interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string | string[] | undefined;
  setValue: (value: string | string[] | undefined) => void;
  disabled: boolean;
  variant: ToggleVariant;
  size: ToggleSize;
  orientation: ToggleGroupOrientation;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext(componentName: string) {
  const context = useContext(ToggleGroupContext);
  if (!context) {
    throw new Error(`${componentName} must be used within ToggleGroup`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

interface ToggleGroupBaseProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
  disabled?: boolean;
  variant?: ToggleVariant;
  size?: ToggleSize;
  orientation?: ToggleGroupOrientation;
}

export interface ToggleGroupSingleProps extends ToggleGroupBaseProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
}

export interface ToggleGroupMultipleProps extends ToggleGroupBaseProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

export interface ToggleGroupItemProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'value' | 'onChange'>,
    BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
  value: string;
}

function getEnabledItems(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLButtonElement>('[data-toggle-group-item="true"]')
  ).filter((item) => !item.disabled);
}

function isPressedValue(
  contextValue: string | string[] | undefined,
  type: ToggleGroupType,
  value: string
) {
  if (type === 'single') {
    return contextValue === value;
  }
  return Array.isArray(contextValue) && contextValue.includes(value);
}

export function ToggleGroup({
  ref,
  type,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  variant = 'secondary',
  size = 'md',
  orientation = 'horizontal',
  className,
  style,
  children,
  ...props
}: ToggleGroupProps) {
  const [singleValue, setSingleValue] = useControllableState<string | undefined>({
    value: type === 'single' ? value : undefined,
    defaultValue: type === 'single' ? defaultValue : undefined,
    onChange: type === 'single' ? onValueChange : undefined
  });
  const [multipleValue, setMultipleValue] = useControllableState<string[]>({
    value: type === 'multiple' ? value : undefined,
    defaultValue: type === 'multiple' ? (defaultValue ?? []) : [],
    onChange: type === 'multiple' ? onValueChange : undefined
  });

  const currentValue = type === 'single' ? singleValue : multipleValue;
  const setValue = (nextValue: string | string[] | undefined) => {
    if (type === 'single') {
      setSingleValue(nextValue as string | undefined);
      return;
    }
    setMultipleValue((nextValue as string[] | undefined) ?? []);
  };

  const styleProps = getToggleGroupRootStyleProps(orientation, { className, style });

  return (
    <ToggleGroupContext.Provider
      value={{ type, value: currentValue, setValue, disabled, variant, size, orientation }}
    >
      <div {...props} {...styleProps} ref={ref} role="group" data-orientation={orientation}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

export function ToggleGroupItem({
  ref,
  value,
  disabled = false,
  className,
  style,
  onClick,
  onKeyDown,
  ...props
}: ToggleGroupItemProps) {
  const context = useToggleGroupContext('ToggleGroupItem');
  const localRef = useRef<HTMLButtonElement | null>(null);
  const isDisabled = context.disabled || disabled;
  const pressed = isPressedValue(context.value, context.type, value);
  const groupItemStyleProps = getToggleGroupItemStyleProps({ className, style });
  const toggleStyleProps = getToggleStyleProps({
    variant: context.variant,
    size: context.size,
    pressed,
    disabled: isDisabled
  });

  const togglePressedState = () => {
    if (isDisabled) {
      return;
    }

    if (context.type === 'single') {
      context.setValue(pressed ? undefined : value);
      return;
    }

    const values = Array.isArray(context.value) ? context.value : [];
    context.setValue(pressed ? values.filter((item) => item !== value) : [...values, value]);
  };

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, direction: 1 | -1) => {
    const root = event.currentTarget.closest('[role="group"]');
    if (!root) {
      return;
    }

    const items = getEnabledItems(root as HTMLElement);
    const currentIndex = items.findIndex((item) => item === event.currentTarget);
    if (currentIndex < 0 || items.length < 2) {
      return;
    }

    const nextIndex = (currentIndex + direction + items.length) % items.length;
    items[nextIndex]?.focus();
    event.preventDefault();
  };

  return (
    <button
      {...props}
      {...groupItemStyleProps}
      {...toggleStyleProps}
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as { current: HTMLButtonElement | null }).current = node;
        }
      }}
      data-toggle-group-item="true"
      data-state={pressed ? 'on' : 'off'}
      aria-pressed={pressed}
      disabled={isDisabled}
      type="button"
      onClick={(event) => {
        togglePressedState();
        onClick?.(event);
      }}
      onKeyDown={(event) => {
        const isHorizontal = context.orientation === 'horizontal';
        if (
          (isHorizontal && event.key === 'ArrowRight') ||
          (!isHorizontal && event.key === 'ArrowDown')
        ) {
          moveFocus(event, 1);
        } else if (
          (isHorizontal && event.key === 'ArrowLeft') ||
          (!isHorizontal && event.key === 'ArrowUp')
        ) {
          moveFocus(event, -1);
        }
        onKeyDown?.(event);
      }}
    />
  );
}
