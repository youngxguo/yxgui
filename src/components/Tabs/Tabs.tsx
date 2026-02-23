import {
  createContext,
  useContext,
  useId,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref
} from 'react';
import { Button, type ButtonProps } from '../Button/Button';
import { Card } from '../Card/Card';
import { getDataPresenceAttribute, getDataStateAttribute } from '../_internal/dataAttributes';
import { useControllableState } from '../_internal/useControllableState';
import {
  getTabsListStyleProps,
  getTabsPanelStyleProps,
  getTabsRootStyleProps,
  getTabsTriggerStyleProps,
  type TabsOrientation
} from './Tabs.styles';

interface TabsContextValue {
  baseId: string;
  value: string;
  setValue: (value: string) => void;
  orientation: TabsOrientation;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Tabs`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  children?: ReactNode;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface TabsTriggerProps extends Omit<ButtonProps, 'type'>, BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
  value: string;
  disabled?: boolean;
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  value: string;
}

export function Tabs({
  ref,
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  className,
  style,
  children,
  ...props
}: TabsProps) {
  const baseId = useId();
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  });
  const styleProps = getTabsRootStyleProps({ className, style });

  return (
    <TabsContext.Provider
      value={{ baseId, value: currentValue, setValue: setCurrentValue, orientation }}
    >
      <div {...props} {...styleProps} ref={ref} data-orientation={orientation}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ ref, className, style, onKeyDown, ...props }: TabsListProps) {
  const context = useTabsContext('TabsList');
  const styleProps = getTabsListStyleProps(context.orientation, { className, style });

  return (
    <Card
      {...props}
      {...styleProps}
      ref={ref}
      role="tablist"
      aria-orientation={context.orientation}
      data-orientation={context.orientation}
      onKeyDown={(event) => {
        const isHorizontal = context.orientation === 'horizontal';
        const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
        const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

        if (![nextKey, prevKey, 'Home', 'End'].includes(event.key)) {
          onKeyDown?.(event);
          return;
        }

        const tabs = Array.from(
          event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
        );
        const activeIndex = tabs.findIndex((tab) => tab === document.activeElement);
        if (!tabs.length) {
          onKeyDown?.(event);
          return;
        }

        let nextIndex = activeIndex >= 0 ? activeIndex : 0;
        if (event.key === nextKey) {
          nextIndex = (activeIndex + 1 + tabs.length) % tabs.length;
        } else if (event.key === prevKey) {
          nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = tabs.length - 1;
        }

        const nextTab = tabs[nextIndex];
        const nextValue = nextTab.dataset.tabsValue;
        if (nextValue) {
          context.setValue(nextValue);
        }
        nextTab.focus();
        event.preventDefault();
        onKeyDown?.(event);
      }}
    />
  );
}

export function TabsTrigger({
  ref,
  value,
  disabled = false,
  variant = 'ghost',
  size = 'sm',
  className,
  style,
  onClick,
  ...props
}: TabsTriggerProps) {
  const context = useTabsContext('TabsTrigger');
  const selected = context.value === value;
  const styleProps = getTabsTriggerStyleProps(selected, disabled, { className, style });
  const triggerId = `${context.baseId}-tab-${value}`;
  const panelId = `${context.baseId}-panel-${value}`;

  return (
    <Button
      {...props}
      {...styleProps}
      variant={variant}
      size={size}
      ref={ref}
      type="button"
      role="tab"
      id={triggerId}
      data-tabs-value={value}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      data-state={getDataStateAttribute(selected, 'active', 'inactive')}
      data-disabled={getDataPresenceAttribute(disabled)}
      onClick={(event) => {
        if (!disabled) {
          context.setValue(value);
        }
        onClick?.(event);
      }}
    />
  );
}

export function TabsPanel({ ref, value, className, style, hidden, ...props }: TabsPanelProps) {
  const context = useTabsContext('TabsPanel');
  const selected = context.value === value;
  const styleProps = getTabsPanelStyleProps({ className, style });
  const triggerId = `${context.baseId}-tab-${value}`;
  const panelId = `${context.baseId}-panel-${value}`;

  return (
    <Card
      {...props}
      {...styleProps}
      ref={ref}
      role="tabpanel"
      id={panelId}
      aria-labelledby={triggerId}
      hidden={hidden ?? !selected}
      tabIndex={0}
      data-state={getDataStateAttribute(selected, 'active', 'inactive')}
    />
  );
}
