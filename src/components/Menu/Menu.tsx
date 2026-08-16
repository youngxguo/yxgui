import { Menu as BaseMenu } from '@base-ui/react/menu';
import * as stylex from '@stylexjs/stylex';
import { overlayStyles } from '../overlayStyles.stylex';
import { useThemePortalContainer } from '../Theme/Theme';

type ClosedProps<Props> = Omit<Props, 'className' | 'render' | 'style'>;
type PositionOptions = Pick<
  BaseMenu.Positioner.Props,
  'align' | 'alignOffset' | 'side' | 'sideOffset'
>;

export type MenuProps = BaseMenu.Root.Props;
export type MenuTriggerProps = ClosedProps<BaseMenu.Trigger.Props> & {
  variant?: 'button' | 'menubar';
};
export type MenuContentProps = ClosedProps<BaseMenu.Popup.Props> & PositionOptions;
export type MenuItemProps = ClosedProps<BaseMenu.Item.Props> & { danger?: boolean };
export type MenuLinkItemProps = ClosedProps<BaseMenu.LinkItem.Props> & { danger?: boolean };
export type MenuCheckboxItemProps = ClosedProps<BaseMenu.CheckboxItem.Props>;
export type MenuRadioGroupProps = ClosedProps<BaseMenu.RadioGroup.Props>;
export type MenuRadioItemProps = ClosedProps<BaseMenu.RadioItem.Props>;
export type MenuGroupProps = ClosedProps<BaseMenu.Group.Props>;
export type MenuGroupLabelProps = ClosedProps<BaseMenu.GroupLabel.Props>;
export type MenuSeparatorProps = ClosedProps<BaseMenu.Separator.Props>;
export type MenuSubmenuProps = BaseMenu.SubmenuRoot.Props;
export type MenuSubmenuTriggerProps = ClosedProps<BaseMenu.SubmenuTrigger.Props>;

function Checkmark() {
  return (
    <svg aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16">
      <path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Menu(props: MenuProps) {
  return <BaseMenu.Root {...props} />;
}

export function MenuTrigger({ variant = 'button', ...props }: MenuTriggerProps) {
  return (
    <BaseMenu.Trigger
      {...props}
      className={
        stylex.props(variant === 'menubar' ? overlayStyles.menubarTrigger : overlayStyles.trigger)
          .className
      }
    />
  );
}

export function MenuContent({
  align = 'start',
  alignOffset,
  children,
  side = 'bottom',
  sideOffset = 8,
  ...props
}: MenuContentProps) {
  const container = useThemePortalContainer();

  return (
    <BaseMenu.Portal container={container}>
      <BaseMenu.Positioner
        align={align}
        alignOffset={alignOffset}
        className={stylex.props(overlayStyles.positioner).className}
        side={side}
        sideOffset={sideOffset}
      >
        <BaseMenu.Popup {...props} className={stylex.props(overlayStyles.menuPopup).className}>
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export function MenuItem({ danger = false, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      {...props}
      className={(state) =>
        stylex.props(
          overlayStyles.menuItem,
          state.highlighted && overlayStyles.menuItemHighlighted,
          danger && overlayStyles.menuItemDanger
        ).className
      }
    />
  );
}

export function MenuLinkItem({ danger = false, ...props }: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem
      {...props}
      className={(state) =>
        stylex.props(
          overlayStyles.menuItem,
          state.highlighted && overlayStyles.menuItemHighlighted,
          danger && overlayStyles.menuItemDanger
        ).className
      }
    />
  );
}

function checkableItemClass(highlighted: boolean) {
  return stylex.props(
    overlayStyles.menuItem,
    overlayStyles.checkableMenuItem,
    highlighted && overlayStyles.menuItemHighlighted
  ).className;
}

export function MenuCheckboxItem({ children, ...props }: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem {...props} className={(state) => checkableItemClass(state.highlighted)}>
      <BaseMenu.CheckboxItemIndicator
        className={stylex.props(overlayStyles.menuIndicator).className}
      >
        <Checkmark />
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export function MenuRadioGroup(props: MenuRadioGroupProps) {
  return <BaseMenu.RadioGroup {...props} />;
}

export function MenuRadioItem({ children, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem {...props} className={(state) => checkableItemClass(state.highlighted)}>
      <BaseMenu.RadioItemIndicator className={stylex.props(overlayStyles.menuIndicator).className}>
        <Checkmark />
      </BaseMenu.RadioItemIndicator>
      {children}
    </BaseMenu.RadioItem>
  );
}

export function MenuGroup(props: MenuGroupProps) {
  return <BaseMenu.Group {...props} />;
}

export function MenuGroupLabel(props: MenuGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      {...props}
      className={stylex.props(overlayStyles.menuGroupLabel).className}
    />
  );
}

export function MenuSeparator(props: MenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      {...props}
      className={stylex.props(overlayStyles.menuSeparator).className}
    />
  );
}

export function MenuSubmenu(props: MenuSubmenuProps) {
  return <BaseMenu.SubmenuRoot {...props} />;
}

export function MenuSubmenuTrigger({ children, ...props }: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      {...props}
      className={(state) =>
        stylex.props(overlayStyles.menuItem, state.highlighted && overlayStyles.menuItemHighlighted)
          .className
      }
    >
      {children}
      <span aria-hidden="true" {...stylex.props(overlayStyles.submenuChevron)}>
        ›
      </span>
    </BaseMenu.SubmenuTrigger>
  );
}
