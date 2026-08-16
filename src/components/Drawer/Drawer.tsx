import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import * as stylex from '@stylexjs/stylex';
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';
import { useThemePortalContainer } from '../Theme/Theme';

type ClosedProps<Props> = Omit<Props, 'className' | 'render' | 'style'>;

export type DrawerSide = 'top' | 'right' | 'bottom' | 'left';
export type DrawerProps = Omit<BaseDrawer.Root.Props, 'swipeDirection'> & {
  side?: DrawerSide;
};
export type DrawerTriggerProps = ClosedProps<BaseDrawer.Trigger.Props>;
export type DrawerContentProps = ClosedProps<BaseDrawer.Popup.Props>;
export type DrawerTitleProps = ClosedProps<BaseDrawer.Title.Props>;
export type DrawerDescriptionProps = ClosedProps<BaseDrawer.Description.Props>;
export type DrawerActionsProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type DrawerCloseProps = ClosedProps<BaseDrawer.Close.Props>;

const DrawerSideContext = createContext<DrawerSide>('right');

const styles = stylex.create({
  backdrop: {
    backgroundColor: 'rgba(17, 24, 39, 0.56)',
    inset: 0,
    opacity: 'calc(1 - var(--drawer-swipe-progress))',
    position: 'fixed',
    transition: 'opacity 240ms cubic-bezier(0.32, 0.72, 0, 1)',
    zIndex: 1000
  },
  backdropTransition: { opacity: 0 },
  viewport: {
    display: 'flex',
    inset: 0,
    position: 'fixed',
    zIndex: 1001
  },
  viewportTop: { alignItems: 'flex-start', justifyContent: 'center' },
  viewportRight: { alignItems: 'stretch', justifyContent: 'flex-end' },
  viewportBottom: { alignItems: 'flex-end', justifyContent: 'center' },
  viewportLeft: { alignItems: 'stretch', justifyContent: 'flex-start' },
  popup: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderMuted,
    borderStyle: 'solid',
    boxShadow: '0 24px 64px rgba(17, 24, 39, 0.24)',
    boxSizing: 'border-box',
    color: colors.text,
    fontFamily: fontFamilies.sans,
    outline: 'none',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    touchAction: 'auto',
    transition: 'transform 240ms cubic-bezier(0.32, 0.72, 0, 1)',
    willChange: 'transform'
  },
  popupTop: {
    borderBottomLeftRadius: radii.md,
    borderBottomRightRadius: radii.md,
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
    borderTopWidth: 0,
    maxHeight: 'calc(100dvh - 16px)',
    maxWidth: '720px',
    transform: 'translateY(var(--drawer-swipe-movement-y))',
    width: 'calc(100% - 32px)'
  },
  popupRight: {
    borderBottomLeftRadius: radii.md,
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    borderRightWidth: 0,
    borderTopLeftRadius: radii.md,
    borderTopWidth: '1px',
    height: '100%',
    maxWidth: 'calc(100vw - 48px)',
    transform: 'translateX(var(--drawer-swipe-movement-x))',
    width: '360px'
  },
  popupBottom: {
    borderBottomWidth: 0,
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
    borderTopLeftRadius: radii.md,
    borderTopRightRadius: radii.md,
    borderTopWidth: '1px',
    maxHeight: 'calc(100dvh - 16px)',
    maxWidth: '720px',
    transform: 'translateY(var(--drawer-swipe-movement-y))',
    width: 'calc(100% - 32px)'
  },
  popupLeft: {
    borderBottomRightRadius: radii.md,
    borderBottomWidth: '1px',
    borderLeftWidth: 0,
    borderRightWidth: '1px',
    borderTopRightRadius: radii.md,
    borderTopWidth: '1px',
    height: '100%',
    maxWidth: 'calc(100vw - 48px)',
    transform: 'translateX(var(--drawer-swipe-movement-x))',
    width: '360px'
  },
  closedTop: { transform: 'translateY(-100%)' },
  closedRight: { transform: 'translateX(100%)' },
  closedBottom: { transform: 'translateY(100%)' },
  closedLeft: { transform: 'translateX(-100%)' },
  swiping: { transitionDuration: '0ms', userSelect: 'none' },
  content: {
    boxSizing: 'border-box',
    display: 'grid',
    gap: spacing.md,
    marginInline: 'auto',
    maxWidth: '640px',
    padding: spacing.lg,
    width: '100%'
  },
  handle: {
    backgroundColor: colors.borderMuted,
    borderRadius: radii.full,
    height: '4px',
    justifySelf: 'center',
    width: '32px'
  },
  title: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lg,
    margin: 0
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'flex-end'
  },
  button: {
    alignItems: 'center',
    backgroundColor: { default: colors.surfaceElevated, ':hover': colors.surfaceSubtle },
    borderColor: colors.borderMuted,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.text,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.lg
  },
  trigger: {
    backgroundColor: { default: colors.primary, ':hover': colors.primaryHover },
    borderColor: 'transparent',
    color: colors.onEmphasis
  }
});

const swipeDirections = {
  top: 'up',
  right: 'right',
  bottom: 'down',
  left: 'left'
} as const;

function viewportSideStyle(side: DrawerSide) {
  if (side === 'top') return styles.viewportTop;
  if (side === 'bottom') return styles.viewportBottom;
  if (side === 'left') return styles.viewportLeft;
  return styles.viewportRight;
}

function popupSideStyle(side: DrawerSide) {
  if (side === 'top') return styles.popupTop;
  if (side === 'bottom') return styles.popupBottom;
  if (side === 'left') return styles.popupLeft;
  return styles.popupRight;
}

function closedSideStyle(side: DrawerSide) {
  if (side === 'top') return styles.closedTop;
  if (side === 'bottom') return styles.closedBottom;
  if (side === 'left') return styles.closedLeft;
  return styles.closedRight;
}

export function Drawer({ children, side = 'right', ...props }: DrawerProps) {
  return (
    <DrawerSideContext.Provider value={side}>
      <BaseDrawer.Root {...props} swipeDirection={swipeDirections[side]}>
        {children}
      </BaseDrawer.Root>
    </DrawerSideContext.Provider>
  );
}

export function DrawerTrigger(props: DrawerTriggerProps) {
  return (
    <BaseDrawer.Trigger
      {...props}
      className={stylex.props(styles.button, styles.trigger).className}
    />
  );
}

export function DrawerContent({ children, ...props }: DrawerContentProps) {
  const container = useThemePortalContainer();
  const side = useContext(DrawerSideContext);
  const showHandle = side === 'top' || side === 'bottom';

  return (
    <BaseDrawer.Portal container={container}>
      <BaseDrawer.Backdrop
        className={(state) =>
          stylex.props(
            styles.backdrop,
            (state.transitionStatus === 'starting' || state.transitionStatus === 'ending') &&
              styles.backdropTransition
          ).className
        }
      />
      <BaseDrawer.Viewport
        className={stylex.props(styles.viewport, viewportSideStyle(side)).className}
      >
        <BaseDrawer.Popup
          {...props}
          className={(state) =>
            stylex.props(
              styles.popup,
              popupSideStyle(side),
              (state.transitionStatus === 'starting' || state.transitionStatus === 'ending') &&
                closedSideStyle(side),
              state.swiping && styles.swiping
            ).className
          }
        >
          <BaseDrawer.Content className={stylex.props(styles.content).className}>
            {showHandle && <div aria-hidden="true" {...stylex.props(styles.handle)} />}
            {children as ReactNode}
          </BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}

export function DrawerTitle(props: DrawerTitleProps) {
  return <BaseDrawer.Title {...props} className={stylex.props(styles.title).className} />;
}

export function DrawerDescription(props: DrawerDescriptionProps) {
  return (
    <BaseDrawer.Description {...props} className={stylex.props(styles.description).className} />
  );
}

export function DrawerActions(props: DrawerActionsProps) {
  return <div {...props} {...stylex.props(styles.actions)} />;
}

export function DrawerClose(props: DrawerCloseProps) {
  return <BaseDrawer.Close {...props} className={stylex.props(styles.button).className} />;
}
