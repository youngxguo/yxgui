import {
  createContext,
  useContext,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref
} from 'react';
import { useControllableState } from '../_internal/useControllableState';
import {
  getAccordionContentInnerStyleProps,
  getAccordionContentStyleProps,
  getAccordionHeaderStyleProps,
  getAccordionIndicatorStyleProps,
  getAccordionItemStyleProps,
  getAccordionRootStyleProps,
  getAccordionTriggerStyleProps
} from './Accordion.styles';

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  baseId: string;
  type: AccordionType;
  collapsible: boolean;
  rootRef: React.RefObject<HTMLDivElement | null>;
  setRootNode: (node: HTMLDivElement | null) => void;
  isItemOpen: (value: string) => boolean;
  toggleItem: (value: string) => void;
}

interface AccordionItemContextValue {
  open: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionContext(componentName: string) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Accordion`);
  }
  return context;
}

function useAccordionItemContext(componentName: string) {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(`${componentName} must be used within AccordionItem`);
  }
  return context;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }
  if (ref) {
    (ref as { current: T }).current = value;
  }
}

function getEnabledAccordionTriggers(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger="true"]:not(:disabled)')
  );
}

interface AccordionBaseProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}

export interface AccordionSingleProps extends AccordionBaseProps {
  type: 'single';
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
  collapsible?: boolean;
}

export interface AccordionMultipleProps extends AccordionBaseProps {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  value: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

function AccordionProviderRoot({
  ref,
  className,
  style,
  children,
  contextValue,
  ...props
}: AccordionBaseProps & { contextValue: AccordionContextValue }) {
  const styleProps = getAccordionRootStyleProps({ className, style });

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        {...props}
        {...styleProps}
        ref={(node) => {
          contextValue.setRootNode(node);
          assignRef(ref, node);
        }}
        data-accordion-type={contextValue.type}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionSingleImpl({
  ref,
  type: _type,
  value,
  defaultValue,
  onValueChange,
  collapsible = false,
  children,
  ...props
}: AccordionSingleProps) {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onValueChange
  });

  return (
    <AccordionProviderRoot
      {...props}
      ref={ref}
      children={children}
      contextValue={{
        baseId,
        type: 'single',
        collapsible,
        rootRef,
        setRootNode: (node) => {
          rootRef.current = node;
        },
        isItemOpen: (itemValue) => currentValue === itemValue,
        toggleItem: (itemValue) => {
          if (currentValue === itemValue) {
            if (collapsible) {
              setCurrentValue(undefined);
            }
            return;
          }
          setCurrentValue(itemValue);
        }
      }}
    />
  );
}

function AccordionMultipleImpl({
  ref,
  type: _type,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: AccordionMultipleProps) {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useControllableState<string[]>({
    value,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange
  });

  return (
    <AccordionProviderRoot
      {...props}
      ref={ref}
      children={children}
      contextValue={{
        baseId,
        type: 'multiple',
        collapsible: true,
        rootRef,
        setRootNode: (node) => {
          rootRef.current = node;
        },
        isItemOpen: (itemValue) => currentValue.includes(itemValue),
        toggleItem: (itemValue) => {
          if (currentValue.includes(itemValue)) {
            setCurrentValue(currentValue.filter((valueEntry) => valueEntry !== itemValue));
            return;
          }
          setCurrentValue([...currentValue, itemValue]);
        }
      }}
    />
  );
}

export function Accordion(props: AccordionProps) {
  if (props.type === 'single') {
    return <AccordionSingleImpl {...props} />;
  }
  return <AccordionMultipleImpl {...props} />;
}

export function AccordionItem({
  ref,
  value,
  disabled = false,
  className,
  style,
  children,
  ...props
}: AccordionItemProps) {
  const accordion = useAccordionContext('AccordionItem');
  const localId = useId();
  const open = accordion.isItemOpen(value);
  const styleProps = getAccordionItemStyleProps(disabled, { className, style });
  const triggerId = `${accordion.baseId}-trigger-${localId}`;
  const contentId = `${accordion.baseId}-content-${localId}`;

  return (
    <AccordionItemContext.Provider value={{ open, disabled, triggerId, contentId }}>
      <div
        {...props}
        {...styleProps}
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        data-accordion-item-value={value}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  ref,
  className,
  style,
  disabled: triggerDisabled = false,
  onClick,
  onKeyDown,
  children,
  ...props
}: AccordionTriggerProps) {
  const accordion = useAccordionContext('AccordionTrigger');
  const item = useAccordionItemContext('AccordionTrigger');
  const disabled = item.disabled || triggerDisabled;
  const styleProps = getAccordionTriggerStyleProps(item.open, disabled, { className, style });
  const headerStyleProps = getAccordionHeaderStyleProps();
  const indicatorStyleProps = getAccordionIndicatorStyleProps();

  return (
    <h3 {...headerStyleProps}>
      <button
        {...props}
        {...styleProps}
        ref={ref}
        type="button"
        id={item.triggerId}
        disabled={disabled}
        data-accordion-trigger="true"
        data-state={item.open ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        aria-expanded={item.open}
        aria-controls={item.contentId}
        onClick={(event) => {
          if (!disabled) {
            const itemValue = event.currentTarget
              .closest<HTMLElement>('[data-accordion-item-value]')
              ?.dataset.accordionItemValue;
            if (itemValue) {
              accordion.toggleItem(itemValue);
            }
          }
          onClick?.(event);
        }}
        onKeyDown={(event) => {
          if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            onKeyDown?.(event);
            return;
          }

          const root = accordion.rootRef.current;
          if (!root) {
            onKeyDown?.(event);
            return;
          }

          const triggers = getEnabledAccordionTriggers(root);
          if (!triggers.length) {
            onKeyDown?.(event);
            return;
          }

          const currentIndex = triggers.findIndex((trigger) => trigger === event.currentTarget);
          let nextIndex = currentIndex >= 0 ? currentIndex : 0;

          if (event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1 + triggers.length) % triggers.length;
          } else if (event.key === 'ArrowUp') {
            nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
          } else if (event.key === 'Home') {
            nextIndex = 0;
          } else if (event.key === 'End') {
            nextIndex = triggers.length - 1;
          }

          triggers[nextIndex]?.focus();
          event.preventDefault();
          onKeyDown?.(event);
        }}
      >
        <span>{children}</span>
        <span {...indicatorStyleProps} aria-hidden="true">
          {item.open ? '-' : '+'}
        </span>
      </button>
    </h3>
  );
}

export function AccordionContent({
  ref,
  className,
  style,
  hidden,
  children,
  ...props
}: AccordionContentProps) {
  const item = useAccordionItemContext('AccordionContent');
  const styleProps = getAccordionContentStyleProps({ className, style });
  const innerStyleProps = getAccordionContentInnerStyleProps();

  return (
    <div
      {...props}
      {...styleProps}
      ref={ref}
      id={item.contentId}
      role="region"
      aria-labelledby={item.triggerId}
      hidden={hidden ?? !item.open}
      data-state={item.open ? 'open' : 'closed'}
    >
      <div {...innerStyleProps}>{children}</div>
    </div>
  );
}
