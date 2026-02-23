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
import { getDataStateAttribute } from '../_internal/dataAttributes';
import { useControllableState } from '../_internal/useControllableState';
import { useFloatingPosition } from '../_internal/useFloatingPosition';
import {
  getDropdownMenuContentStyleProps,
  getDropdownMenuItemStyleProps
} from './DropdownMenu.styles';

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  setTriggerNode: (node: HTMLButtonElement | null) => void;
  contentId: string;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext(componentName: string) {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(`${componentName} must be used within DropdownMenu`);
  }
  return context;
}

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export interface DropdownMenuTriggerProps extends Omit<ButtonProps, 'type'> {
  ref?: Ref<HTMLButtonElement>;
}

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
  offset?: number;
}

export interface DropdownMenuItemProps extends Omit<ButtonProps, 'type'>, BaseStyleProps {
  ref?: Ref<HTMLButtonElement>;
  onSelect?: () => void;
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

export function DropdownMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  children
}: DropdownMenuProps) {
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });

  return (
    <DropdownMenuContext.Provider
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
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  ref,
  variant = 'secondary',
  size = 'sm',
  onClick,
  onKeyDown,
  ...props
}: DropdownMenuTriggerProps) {
  const context = useDropdownMenuContext('DropdownMenuTrigger');

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
      aria-haspopup="menu"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      data-state={getDataStateAttribute(context.open, 'open', 'closed')}
      onClick={(event) => {
        context.setOpen(!context.open);
        onClick?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown') {
          context.setOpen(true);
          event.preventDefault();
        }
        onKeyDown?.(event);
      }}
    />
  );
}

export function DropdownMenuContent({
  ref,
  className,
  style,
  offset = 6,
  onKeyDown,
  children,
  ...props
}: DropdownMenuContentProps) {
  const context = useDropdownMenuContext('DropdownMenuContent');
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

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        context.setOpen(false);
        context.triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [context]);

  if (!context.open) {
    return null;
  }

  const contentStyleProps = getDropdownMenuContentStyleProps({
    className,
    style: {
      top: `${position.top}px`,
      left: `${position.left}px`,
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
        role="menu"
        tabIndex={-1}
        data-state="open"
        onKeyDown={(event) => {
          const content = event.currentTarget;
          const items = getEnabledMenuItems(content);
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
      </Card>
    </Portal>
  );
}

export function DropdownMenuItem({
  ref,
  disabled = false,
  variant = 'ghost',
  size = 'sm',
  className,
  style,
  onClick,
  onSelect,
  ...props
}: DropdownMenuItemProps) {
  const context = useDropdownMenuContext('DropdownMenuItem');
  const styleProps = getDropdownMenuItemStyleProps({ className, style });

  return (
    <Button
      {...props}
      {...styleProps}
      variant={variant}
      size={size}
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
