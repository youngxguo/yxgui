import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import * as stylex from '@stylexjs/stylex';
import {
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  type MenuCheckboxItemProps,
  type MenuContentProps,
  type MenuGroupLabelProps,
  type MenuGroupProps,
  type MenuItemProps,
  type MenuLinkItemProps,
  type MenuRadioGroupProps,
  type MenuRadioItemProps,
  type MenuSeparatorProps,
  type MenuSubmenuProps,
  type MenuSubmenuTriggerProps
} from '../Menu';
import { overlayStyles } from '../overlayStyles.stylex';

export type ContextMenuProps = BaseContextMenu.Root.Props;
export type ContextMenuTriggerProps = Omit<
  BaseContextMenu.Trigger.Props,
  'className' | 'render' | 'style'
>;
export type ContextMenuContentProps = MenuContentProps;
export type ContextMenuItemProps = MenuItemProps;
export type ContextMenuLinkItemProps = MenuLinkItemProps;
export type ContextMenuCheckboxItemProps = MenuCheckboxItemProps;
export type ContextMenuRadioGroupProps = MenuRadioGroupProps;
export type ContextMenuRadioItemProps = MenuRadioItemProps;
export type ContextMenuGroupProps = MenuGroupProps;
export type ContextMenuGroupLabelProps = MenuGroupLabelProps;
export type ContextMenuSeparatorProps = MenuSeparatorProps;
export type ContextMenuSubmenuProps = MenuSubmenuProps;
export type ContextMenuSubmenuTriggerProps = MenuSubmenuTriggerProps;

export function ContextMenu(props: ContextMenuProps) {
  return <BaseContextMenu.Root {...props} />;
}

export function ContextMenuTrigger(props: ContextMenuTriggerProps) {
  return (
    <BaseContextMenu.Trigger
      {...props}
      className={stylex.props(overlayStyles.contextTrigger).className}
    />
  );
}

export const ContextMenuContent = MenuContent;
export const ContextMenuItem = MenuItem;
export const ContextMenuLinkItem = MenuLinkItem;
export const ContextMenuCheckboxItem = MenuCheckboxItem;
export const ContextMenuRadioGroup = MenuRadioGroup;
export const ContextMenuRadioItem = MenuRadioItem;
export const ContextMenuGroup = MenuGroup;
export const ContextMenuGroupLabel = MenuGroupLabel;
export const ContextMenuSeparator = MenuSeparator;
export const ContextMenuSubmenu = MenuSubmenu;
export const ContextMenuSubmenuTrigger = MenuSubmenuTrigger;
