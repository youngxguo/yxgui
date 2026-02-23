import {
  createContext,
  useContext,
  useId,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref
} from 'react';
import { Button, type ButtonProps } from '../Button/Button';
import { Card } from '../Card/Card';
import { Portal } from '../_internal/Portal';
import { getDataStateAttribute } from '../_internal/dataAttributes';
import { assignRef } from '../_internal/refs';
import { useControllableState } from '../_internal/useControllableState';
import { useDismissableLayer } from '../_internal/useDismissableLayer';
import { useFloatingPosition } from '../_internal/useFloatingPosition';
import { getPopoverContentStyleProps } from './Popover.styles';

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  setTriggerNode: (node: HTMLButtonElement | null) => void;
  contentId: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(componentName: string) {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Popover`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface PopoverTriggerProps extends Omit<ButtonProps, 'type'> {
  ref?: Ref<HTMLButtonElement>;
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  matchTriggerWidth?: boolean;
  offset?: number;
}

export function Popover({ open, defaultOpen = false, onOpenChange, children }: PopoverProps) {
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });

  return (
    <PopoverContext.Provider
      value={{
        open: isOpen,
        setOpen: setIsOpen,
        triggerRef,
        setTriggerNode: (node) => {
          triggerRef.current = node;
        },
        contentId
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  ref,
  variant = 'secondary',
  size = 'sm',
  onClick,
  ...props
}: PopoverTriggerProps) {
  const context = usePopoverContext('PopoverTrigger');

  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      ref={(node) => {
        context.setTriggerNode(node);
        assignRef(ref, node);
      }}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      data-state={getDataStateAttribute(context.open, 'open', 'closed')}
      onClick={(event) => {
        context.setOpen(!context.open);
        onClick?.(event);
      }}
    />
  );
}

export function PopoverContent({
  ref,
  className,
  style,
  matchTriggerWidth = false,
  offset = 8,
  onKeyDown,
  children,
  ...props
}: PopoverContentProps) {
  const context = usePopoverContext('PopoverContent');
  const contentRef = useRef<HTMLDivElement>(null);
  const position = useFloatingPosition({
    open: context.open,
    anchorRef: context.triggerRef,
    offset,
    matchWidth: matchTriggerWidth
  });

  useDismissableLayer({
    open: context.open,
    layerRef: contentRef,
    branchRefs: [context.triggerRef],
    onDismiss: () => context.setOpen(false)
  });

  if (!context.open) {
    return null;
  }

  const contentStyleProps = getPopoverContentStyleProps({
    className,
    style: {
      top: `${position.top}px`,
      left: `${position.left}px`,
      minWidth: position.minWidth ? `${position.minWidth}px` : undefined,
      ...style
    }
  });

  return (
    <Portal>
      <Card
        {...props}
        {...contentStyleProps}
        ref={(node) => {
          contentRef.current = node;
          assignRef(ref, node);
        }}
        id={context.contentId}
        role="dialog"
        tabIndex={-1}
        data-state="open"
        onKeyDown={onKeyDown}
      >
        {children}
      </Card>
    </Portal>
  );
}
