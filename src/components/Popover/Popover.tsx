import { Popover as BasePopover } from '@base-ui/react/popover';
import * as stylex from '@stylexjs/stylex';
import { overlayStyles } from '../overlayStyles.stylex';
import { useThemePortalContainer } from '../Theme/Theme';

export type PopoverProps = BasePopover.Root.Props;
export type PopoverTriggerProps = Omit<BasePopover.Trigger.Props, 'className' | 'render' | 'style'>;
type PositionOptions = Pick<
  BasePopover.Positioner.Props,
  'align' | 'alignOffset' | 'side' | 'sideOffset'
>;
export type PopoverContentProps = Omit<BasePopover.Popup.Props, 'className' | 'render' | 'style'> &
  PositionOptions & { showArrow?: boolean };
export type PopoverTitleProps = Omit<BasePopover.Title.Props, 'className' | 'render' | 'style'>;
export type PopoverDescriptionProps = Omit<
  BasePopover.Description.Props,
  'className' | 'render' | 'style'
>;
export type PopoverCloseProps = Omit<BasePopover.Close.Props, 'className' | 'render' | 'style'>;

function Arrow() {
  return (
    <BasePopover.Arrow className={stylex.props(overlayStyles.popoverArrow).className}>
      <svg
        aria-hidden="true"
        focusable="false"
        height="5"
        viewBox="0 0 10 5"
        width="10"
        {...stylex.props(overlayStyles.arrowSvg)}
      >
        <path d="M0 5 5 0l5 5Z" fill="currentColor" />
      </svg>
    </BasePopover.Arrow>
  );
}

export function Popover(props: PopoverProps) {
  return <BasePopover.Root {...props} />;
}

export function PopoverTrigger(props: PopoverTriggerProps) {
  return (
    <BasePopover.Trigger {...props} className={stylex.props(overlayStyles.trigger).className} />
  );
}

export function PopoverContent({
  align = 'center',
  alignOffset,
  children,
  showArrow = true,
  side = 'bottom',
  sideOffset = 8,
  ...props
}: PopoverContentProps) {
  const container = useThemePortalContainer();

  return (
    <BasePopover.Portal container={container}>
      <BasePopover.Positioner
        align={align}
        alignOffset={alignOffset}
        className={stylex.props(overlayStyles.positioner).className}
        side={side}
        sideOffset={sideOffset}
      >
        <BasePopover.Popup
          {...props}
          className={stylex.props(overlayStyles.popoverPopup).className}
        >
          {showArrow && <Arrow />}
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export function PopoverTitle(props: PopoverTitleProps) {
  return <BasePopover.Title {...props} className={stylex.props(overlayStyles.title).className} />;
}

export function PopoverDescription(props: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      {...props}
      className={stylex.props(overlayStyles.description).className}
    />
  );
}

export function PopoverClose(props: PopoverCloseProps) {
  return (
    <BasePopover.Close
      {...props}
      className={stylex.props(overlayStyles.secondaryButton).className}
    />
  );
}
