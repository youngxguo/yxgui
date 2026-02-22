import {
  createContext,
  useContext,
  useEffect,
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
import { useControllableState } from '../_internal/useControllableState';
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

function assignRef<T>(ref: Ref<T> | undefined, value: T) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    (ref as { current: T }).current = value;
  }
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

  useEffect(() => {
    if (!context.open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (contentRef.current?.contains(target) || context.triggerRef.current?.contains(target)) {
        return;
      }
      context.setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        context.setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [context]);

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
        onKeyDown={onKeyDown}
      >
        {children}
      </Card>
    </Portal>
  );
}
