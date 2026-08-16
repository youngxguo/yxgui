import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import * as stylex from '@stylexjs/stylex';
import { createContext, useContext, useId } from 'react';
import { overlayStyles } from '../overlayStyles.stylex';
import { useThemePortalContainer } from '../Theme/Theme';

export type TooltipProviderProps = BaseTooltip.Provider.Props;
export type TooltipProps = BaseTooltip.Root.Props;
export type TooltipTriggerProps = Omit<BaseTooltip.Trigger.Props, 'className' | 'render' | 'style'>;
type PositionOptions = Pick<
  BaseTooltip.Positioner.Props,
  'align' | 'alignOffset' | 'side' | 'sideOffset'
>;
export type TooltipContentProps = Omit<BaseTooltip.Popup.Props, 'className' | 'render' | 'style'> &
  PositionOptions & { showArrow?: boolean };

const TooltipContentIdContext = createContext<string | undefined>(undefined);

function Arrow() {
  return (
    <BaseTooltip.Arrow className={stylex.props(overlayStyles.tooltipArrow).className}>
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
    </BaseTooltip.Arrow>
  );
}

export function TooltipProvider({ delay = 400, ...props }: TooltipProviderProps) {
  return <BaseTooltip.Provider {...props} delay={delay} />;
}

export function Tooltip(props: TooltipProps) {
  const contentId = useId();

  return (
    <TooltipContentIdContext.Provider value={contentId}>
      <BaseTooltip.Root {...props} />
    </TooltipContentIdContext.Provider>
  );
}

export function TooltipTrigger({ 'aria-describedby': describedBy, ...props }: TooltipTriggerProps) {
  const contentId = useContext(TooltipContentIdContext);

  return (
    <BaseTooltip.Trigger
      {...props}
      aria-describedby={[describedBy, contentId].filter(Boolean).join(' ') || undefined}
      className={stylex.props(overlayStyles.iconTrigger).className}
    />
  );
}

export function TooltipContent({
  align = 'center',
  alignOffset,
  children,
  showArrow = true,
  side = 'top',
  sideOffset = 6,
  ...props
}: TooltipContentProps) {
  const container = useThemePortalContainer();
  const contentId = useContext(TooltipContentIdContext);

  return (
    <BaseTooltip.Portal container={container}>
      <BaseTooltip.Positioner
        align={align}
        alignOffset={alignOffset}
        className={stylex.props(overlayStyles.positioner).className}
        side={side}
        sideOffset={sideOffset}
      >
        <BaseTooltip.Popup
          {...props}
          className={stylex.props(overlayStyles.tooltipPopup).className}
          id={props.id ?? contentId}
          role="tooltip"
        >
          {showArrow && <Arrow />}
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
