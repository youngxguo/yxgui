import {
  createContext,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref
} from 'react';
import { useControllableState } from '../_internal/useControllableState';
import {
  getCollapsibleContentInnerStyleProps,
  getCollapsibleContentStyleProps,
  getCollapsibleIndicatorStyleProps,
  getCollapsibleRootStyleProps,
  getCollapsibleTriggerStyleProps
} from './Collapsible.styles';

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

interface CollapsibleContextValue {
  open: boolean;
  disabled: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext(componentName: string) {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Collapsible`);
  }
  return context;
}

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
}

export interface CollapsibleTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>, BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export function Collapsible({
  ref,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  className,
  style,
  children,
  ...props
}: CollapsibleProps) {
  const baseId = useId();
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const rootStyleProps = getCollapsibleRootStyleProps({ className, style });

  return (
    <CollapsibleContext.Provider
      value={{
        open: isOpen,
        disabled,
        setOpen: setIsOpen,
        triggerId: `${baseId}-trigger`,
        contentId: `${baseId}-content`
      }}
    >
      <div
        {...props}
        {...rootStyleProps}
        ref={ref}
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger({
  ref,
  className,
  style,
  disabled: disabledProp = false,
  onClick,
  children,
  ...props
}: CollapsibleTriggerProps) {
  const context = useCollapsibleContext('CollapsibleTrigger');
  const disabled = context.disabled || disabledProp;
  const triggerStyleProps = getCollapsibleTriggerStyleProps(context.open, disabled, {
    className,
    style
  });
  const indicatorStyleProps = getCollapsibleIndicatorStyleProps();

  return (
    <button
      {...props}
      {...triggerStyleProps}
      ref={ref}
      type="button"
      id={context.triggerId}
      disabled={disabled}
      data-state={context.open ? 'open' : 'closed'}
      data-disabled={disabled ? '' : undefined}
      aria-expanded={context.open}
      aria-controls={context.contentId}
      onClick={(event) => {
        if (!disabled) {
          context.setOpen(!context.open);
        }
        onClick?.(event);
      }}
    >
      <span>{children}</span>
      <span {...indicatorStyleProps} aria-hidden="true">
        {context.open ? '-' : '+'}
      </span>
    </button>
  );
}

export function CollapsibleContent({
  ref,
  className,
  style,
  hidden,
  children,
  ...props
}: CollapsibleContentProps) {
  const context = useCollapsibleContext('CollapsibleContent');
  const contentStyleProps = getCollapsibleContentStyleProps({ className, style });
  const innerStyleProps = getCollapsibleContentInnerStyleProps();

  return (
    <div
      {...props}
      {...contentStyleProps}
      ref={ref}
      id={context.contentId}
      role="region"
      aria-labelledby={context.triggerId}
      hidden={hidden ?? !context.open}
      data-state={context.open ? 'open' : 'closed'}
      data-disabled={context.disabled ? '' : undefined}
    >
      <div {...innerStyleProps}>{children}</div>
    </div>
  );
}
