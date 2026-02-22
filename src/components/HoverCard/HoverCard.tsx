import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref
} from 'react';
import { Portal } from '../_internal/Portal';
import { useControllableState } from '../_internal/useControllableState';
import { useFloatingPosition } from '../_internal/useFloatingPosition';
import { getHoverCardContentStyleProps } from './HoverCard.styles';

interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  setTriggerNode: (node: HTMLButtonElement | null) => void;
  contentId: string;
  closeDelay: number;
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null);

function useHoverCardContext(componentName: string) {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error(`${componentName} must be used within HoverCard`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface HoverCardProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  children?: ReactNode;
}

export interface HoverCardTriggerProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> {
  ref?: Ref<HTMLButtonElement>;
}

export interface HoverCardContentProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
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

export function HoverCard({
  open,
  defaultOpen = false,
  onOpenChange,
  openDelay = 40,
  closeDelay = 80,
  children
}: HoverCardProps) {
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const openTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current !== null) {
        window.clearTimeout(openTimeoutRef.current);
      }
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const clearTimers = () => {
    if (openTimeoutRef.current !== null) {
      window.clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleOpen = () => {
    clearTimers();
    if (openDelay <= 0) {
      setIsOpen(true);
      return;
    }
    openTimeoutRef.current = window.setTimeout(() => setIsOpen(true), openDelay);
  };

  const scheduleClose = () => {
    clearTimers();
    if (closeDelay <= 0) {
      setIsOpen(false);
      return;
    }
    closeTimeoutRef.current = window.setTimeout(() => setIsOpen(false), closeDelay);
  };

  return (
    <HoverCardContext.Provider
      value={{
        open: isOpen,
        setOpen: setIsOpen,
        triggerRef,
        setTriggerNode: (node) => {
          triggerRef.current = node;
        },
        contentId,
        closeDelay
      }}
    >
      <HoverCardActionsContext.Provider value={{ scheduleOpen, scheduleClose, clearTimers }}>
        {children}
      </HoverCardActionsContext.Provider>
    </HoverCardContext.Provider>
  );
}

interface HoverCardActionsContextValue {
  scheduleOpen: () => void;
  scheduleClose: () => void;
  clearTimers: () => void;
}

const HoverCardActionsContext = createContext<HoverCardActionsContextValue | null>(null);

function useHoverCardActions(componentName: string) {
  const context = useContext(HoverCardActionsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within HoverCard`);
  }
  return context;
}

export function HoverCardTrigger({
  ref,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: HoverCardTriggerProps) {
  const context = useHoverCardContext('HoverCardTrigger');
  const actions = useHoverCardActions('HoverCardTrigger');

  return (
    <button
      {...props}
      ref={(node) => {
        context.setTriggerNode(node);
        assignRef(ref, node);
      }}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      aria-describedby={context.open ? context.contentId : undefined}
      onMouseEnter={(event) => {
        actions.scheduleOpen();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        actions.scheduleClose();
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        actions.scheduleOpen();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        actions.scheduleClose();
        onBlur?.(event);
      }}
    />
  );
}

export function HoverCardContent({
  ref,
  className,
  style,
  offset = 8,
  onMouseEnter,
  onMouseLeave,
  children,
  ...props
}: HoverCardContentProps) {
  const context = useHoverCardContext('HoverCardContent');
  const actions = useHoverCardActions('HoverCardContent');
  const contentRef = useRef<HTMLDivElement>(null);
  const position = useFloatingPosition({
    open: context.open,
    anchorRef: context.triggerRef,
    offset,
    matchWidth: false
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

  const styleProps = getHoverCardContentStyleProps({
    className,
    style: {
      top: `${position.top}px`,
      left: `${position.left}px`,
      ...style
    }
  });

  return (
    <Portal>
      <div
        {...props}
        {...styleProps}
        ref={(node) => {
          contentRef.current = node;
          assignRef(ref, node);
        }}
        id={context.contentId}
        role="dialog"
        tabIndex={-1}
        onMouseEnter={(event) => {
          actions.clearTimers();
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          actions.scheduleClose();
          onMouseLeave?.(event);
        }}
      >
        {children}
      </div>
    </Portal>
  );
}
