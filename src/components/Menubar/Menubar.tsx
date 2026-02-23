import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type Ref
} from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuProps,
  type DropdownMenuTriggerProps
} from '../DropdownMenu/DropdownMenu';
import { Separator } from '../Separator/Separator';
import {
  getMenubarRootStyleProps,
  getMenubarSeparatorStyleProps,
  getMenubarTriggerStyleProps
} from './Menubar.styles';

interface BaseStyleProps {
  className?: string;
  style?: CSSProperties;
}

interface MenubarContextValue {
  registerTrigger: (node: HTMLButtonElement | null) => void;
  focusAdjacent: (current: HTMLButtonElement, direction: 1 | -1) => void;
}

const MenubarContext = createContext<MenubarContextValue | null>(null);

function useMenubarContext(componentName: string) {
  const context = useContext(MenubarContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Menubar`);
  }
  return context;
}

export interface MenubarProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

export type MenubarMenuProps = DropdownMenuProps;
export type MenubarTriggerProps = DropdownMenuTriggerProps & BaseStyleProps;
export type MenubarContentProps = DropdownMenuContentProps;
export type MenubarItemProps = DropdownMenuItemProps;
export interface MenubarSeparatorProps extends HTMLAttributes<HTMLDivElement>, BaseStyleProps {
  ref?: Ref<HTMLDivElement>;
}

function getStyleOptions({ className, style }: BaseStyleProps) {
  return { className, style };
}

export function Menubar({ ref, className, style, ...props }: MenubarProps) {
  const triggersRef = useRef<HTMLButtonElement[]>([]);
  const styleProps = getMenubarRootStyleProps(getStyleOptions({ className, style }));

  const registerTrigger = (node: HTMLButtonElement | null) => {
    if (!node) {
      return;
    }
    if (!triggersRef.current.includes(node)) {
      triggersRef.current.push(node);
    }
    triggersRef.current = triggersRef.current.filter((button) => button.isConnected);
  };

  const focusAdjacent = (current: HTMLButtonElement, direction: 1 | -1) => {
    const enabled = triggersRef.current.filter((button) => !button.disabled);
    const currentIndex = enabled.findIndex((button) => button === current);
    if (currentIndex < 0 || enabled.length < 2) {
      return;
    }
    const nextIndex = (currentIndex + direction + enabled.length) % enabled.length;
    enabled[nextIndex]?.focus();
  };

  return (
    <MenubarContext.Provider value={{ registerTrigger, focusAdjacent }}>
      <div {...props} {...styleProps} ref={ref} role="menubar" />
    </MenubarContext.Provider>
  );
}

export function MenubarMenu(props: MenubarMenuProps) {
  return <DropdownMenu {...props} />;
}

export function MenubarTrigger({
  ref,
  className,
  style,
  variant = 'ghost',
  size = 'sm',
  onKeyDown,
  ...props
}: MenubarTriggerProps) {
  const context = useMenubarContext('MenubarTrigger');
  const styleProps = getMenubarTriggerStyleProps(getStyleOptions({ className, style }));

  return (
    <DropdownMenuTrigger
      {...props}
      variant={variant}
      size={size}
      {...styleProps}
      ref={(node) => {
        context.registerTrigger(node);
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as { current: HTMLButtonElement | null }).current = node;
        }
      }}
      role="menuitem"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          context.focusAdjacent(event.currentTarget, 1);
          event.preventDefault();
        } else if (event.key === 'ArrowLeft') {
          context.focusAdjacent(event.currentTarget, -1);
          event.preventDefault();
        }
        onKeyDown?.(event);
      }}
    />
  );
}

export function MenubarContent(props: MenubarContentProps) {
  return <DropdownMenuContent {...props} />;
}

export function MenubarItem(props: MenubarItemProps) {
  return <DropdownMenuItem {...props} />;
}

export function MenubarSeparator({ ref, className, style, ...props }: MenubarSeparatorProps) {
  const styleProps = getMenubarSeparatorStyleProps(getStyleOptions({ className, style }));
  return <Separator {...props} {...styleProps} ref={ref} />;
}
