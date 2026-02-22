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
import {
  getContextMenuContentStyleProps,
  getContextMenuItemStyleProps,
  getContextMenuSeparatorStyleProps,
  getContextMenuTriggerStyleProps
} from './ContextMenu.styles';

interface ContextMenuPosition {
  x: number;
  y: number;
}

interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: ContextMenuPosition;
  setPosition: (position: ContextMenuPosition) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  setTriggerNode: (node: HTMLDivElement | null) => void;
  contentId: string;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

function useContextMenuContext(componentName: string) {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error(`${componentName} must be used within ContextMenu`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface ContextMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export interface ContextMenuItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>, BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
  onSelect?: () => void;
}

export interface ContextMenuSeparatorProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
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

function getEnabledMenuItems(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')).filter(
    (item) => !item.disabled
  );
}

export function ContextMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  children
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const [position, setPosition] = useControllableState<ContextMenuPosition>({
    defaultValue: { x: 0, y: 0 }
  });
  const contentId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <ContextMenuContext.Provider
      value={{
        open: isOpen,
        setOpen: setIsOpen,
        position,
        setPosition,
        triggerRef,
        setTriggerNode: (node) => {
          triggerRef.current = node;
        },
        contentId
      }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
}

export function ContextMenuTrigger({
  ref,
  className,
  style,
  onContextMenu,
  onKeyDown,
  tabIndex = 0,
  ...props
}: ContextMenuTriggerProps) {
  const context = useContextMenuContext('ContextMenuTrigger');
  const styleProps = getContextMenuTriggerStyleProps({ className, style });

  return (
    <div
      {...props}
      {...styleProps}
      ref={(node) => {
        context.setTriggerNode(node);
        assignRef(ref, node);
      }}
      tabIndex={tabIndex}
      aria-haspopup="menu"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      onContextMenu={(event) => {
        event.preventDefault();
        context.setPosition({ x: event.clientX, y: event.clientY });
        context.setOpen(true);
        onContextMenu?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey)) {
          const rect = event.currentTarget.getBoundingClientRect();
          context.setPosition({ x: rect.left + 8, y: rect.bottom + 4 });
          context.setOpen(true);
          event.preventDefault();
        }
        onKeyDown?.(event);
      }}
    />
  );
}

export function ContextMenuContent({
  ref,
  className,
  style,
  onKeyDown,
  children,
  ...props
}: ContextMenuContentProps) {
  const context = useContextMenuContext('ContextMenuContent');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!context.open) {
      return;
    }

    const content = contentRef.current;
    const firstItem = content ? getEnabledMenuItems(content)[0] : undefined;
    firstItem?.focus();

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
        context.triggerRef.current?.focus();
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

  const styleProps = getContextMenuContentStyleProps({
    className,
    style: {
      left: `${context.position.x}px`,
      top: `${context.position.y}px`,
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
        role="menu"
        tabIndex={-1}
        onKeyDown={(event) => {
          const items = getEnabledMenuItems(event.currentTarget);
          if (!items.length) {
            onKeyDown?.(event);
            return;
          }
          const currentIndex = items.findIndex((item) => item === document.activeElement);
          let nextIndex = currentIndex;
          if (event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1 + items.length) % items.length;
          } else if (event.key === 'ArrowUp') {
            nextIndex = (currentIndex - 1 + items.length) % items.length;
          } else if (event.key === 'Home') {
            nextIndex = 0;
          } else if (event.key === 'End') {
            nextIndex = items.length - 1;
          } else {
            onKeyDown?.(event);
            return;
          }
          items[nextIndex]?.focus();
          event.preventDefault();
          onKeyDown?.(event);
        }}
      >
        {children}
      </div>
    </Portal>
  );
}

export function ContextMenuItem({
  ref,
  disabled = false,
  className,
  style,
  onClick,
  onSelect,
  ...props
}: ContextMenuItemProps) {
  const context = useContextMenuContext('ContextMenuItem');
  const styleProps = getContextMenuItemStyleProps({ className, style });

  return (
    <button
      {...props}
      {...styleProps}
      ref={ref}
      type="button"
      role="menuitem"
      disabled={disabled}
      aria-disabled={disabled}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onSelect?.();
        context.setOpen(false);
        context.triggerRef.current?.focus();
        onClick?.(event);
      }}
    />
  );
}

export function ContextMenuSeparator({
  ref,
  className,
  style,
  ...props
}: ContextMenuSeparatorProps) {
  const styleProps = getContextMenuSeparatorStyleProps({ className, style });
  return <div {...props} {...styleProps} ref={ref} role="separator" />;
}
