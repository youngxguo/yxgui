import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import * as stylex from '@stylexjs/stylex';
import { useId, type ReactNode } from 'react';
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

export type NavigationMenuProps = ClosedProps<BaseNavigationMenu.Root.Props>;
export type NavigationMenuListProps = ClosedProps<BaseNavigationMenu.List.Props>;
export type NavigationMenuItemProps = ClosedProps<BaseNavigationMenu.Item.Props>;
export type NavigationMenuTriggerProps = ClosedProps<BaseNavigationMenu.Trigger.Props>;
export type NavigationMenuContentProps = ClosedProps<BaseNavigationMenu.Content.Props>;
export type NavigationMenuLinkProps = ClosedProps<BaseNavigationMenu.Link.Props> & {
  description?: ReactNode;
};
export type NavigationMenuTriggerLinkProps = ClosedProps<BaseNavigationMenu.Link.Props>;

const styles = stylex.create({
  root: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    maxWidth: '100%'
  },
  list: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.sm,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  control: {
    alignItems: 'center',
    backgroundColor: { default: 'transparent', ':hover': colors.surfaceSubtle },
    borderRadius: radii.sm,
    borderWidth: 0,
    boxSizing: 'border-box',
    color: colors.text,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    gap: spacing.sm,
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    minHeight: '36px',
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '-1px',
    paddingBlock: spacing.md,
    paddingInline: spacing.lg,
    textDecoration: 'none',
    userSelect: 'none'
  },
  openControl: { backgroundColor: colors.surfaceSubtle },
  icon: {
    color: colors.textMuted,
    display: 'inline-block',
    lineHeight: 1,
    transform: 'rotate(0deg)',
    transition: 'transform 120ms ease'
  },
  openIcon: { transform: 'rotate(180deg)' },
  positioner: { zIndex: 1100 },
  popup: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: '0 12px 36px rgba(17, 24, 39, 0.2)',
    color: colors.text,
    opacity: 1,
    outline: 'none',
    overflow: 'hidden',
    transform: 'scale(1)',
    transformOrigin: 'var(--transform-origin)',
    transition: 'opacity 120ms ease, transform 120ms ease'
  },
  popupTransition: { opacity: 0, transform: 'scale(0.98)' },
  viewport: { height: '100%', overflow: 'hidden', width: '100%' },
  content: {
    boxSizing: 'border-box',
    display: 'grid',
    gap: spacing.sm,
    maxWidth: 'calc(100vw - 32px)',
    opacity: 1,
    padding: spacing.md,
    transition: 'opacity 120ms ease',
    width: '360px'
  },
  contentTransition: { opacity: 0 },
  link: {
    backgroundColor: { default: 'transparent', ':hover': colors.surfaceSubtle },
    borderRadius: radii.sm,
    color: colors.text,
    display: 'grid',
    gap: spacing.sm,
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '-1px',
    padding: spacing.md,
    textAlign: 'left',
    textDecoration: 'none'
  },
  activeLink: { backgroundColor: colors.surfaceSubtle },
  linkTitle: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  linkDescription: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.sm
  }
});

export function NavigationMenu({ children, ...props }: NavigationMenuProps) {
  const container = useThemePortalContainer();

  return (
    <BaseNavigationMenu.Root {...props} className={stylex.props(styles.root).className}>
      {children}
      <BaseNavigationMenu.Portal container={container}>
        <BaseNavigationMenu.Positioner
          className={stylex.props(styles.positioner).className}
          collisionPadding={16}
          sideOffset={8}
        >
          <BaseNavigationMenu.Popup
            className={(state) =>
              stylex.props(
                styles.popup,
                (state.transitionStatus === 'starting' || state.transitionStatus === 'ending') &&
                  styles.popupTransition
              ).className
            }
          >
            <BaseNavigationMenu.Viewport className={stylex.props(styles.viewport).className} />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
  );
}

export function NavigationMenuList(props: NavigationMenuListProps) {
  return <BaseNavigationMenu.List {...props} className={stylex.props(styles.list).className} />;
}

export function NavigationMenuItem(props: NavigationMenuItemProps) {
  return <BaseNavigationMenu.Item {...props} />;
}

export function NavigationMenuTrigger({ children, ...props }: NavigationMenuTriggerProps) {
  return (
    <BaseNavigationMenu.Trigger
      {...props}
      className={(state) =>
        stylex.props(styles.control, state.open && styles.openControl).className
      }
    >
      {children}
      <BaseNavigationMenu.Icon
        aria-hidden="true"
        className={(state) => stylex.props(styles.icon, state.open && styles.openIcon).className}
      >
        ▾
      </BaseNavigationMenu.Icon>
    </BaseNavigationMenu.Trigger>
  );
}

export function NavigationMenuContent(props: NavigationMenuContentProps) {
  return (
    <BaseNavigationMenu.Content
      {...props}
      className={(state) =>
        stylex.props(
          styles.content,
          (state.transitionStatus === 'starting' || state.transitionStatus === 'ending') &&
            styles.contentTransition
        ).className
      }
    />
  );
}

export function NavigationMenuLink({
  'aria-describedby': ariaDescribedBy,
  children,
  closeOnClick = true,
  description,
  ...props
}: NavigationMenuLinkProps) {
  const generatedDescriptionId = useId();
  const descriptionId = description ? generatedDescriptionId : undefined;
  const describedBy = [ariaDescribedBy, descriptionId].filter(Boolean).join(' ') || undefined;

  return (
    <BaseNavigationMenu.Link
      {...props}
      aria-describedby={describedBy}
      closeOnClick={closeOnClick}
      className={(state) => stylex.props(styles.link, state.active && styles.activeLink).className}
    >
      <span {...stylex.props(styles.linkTitle)}>{children}</span>
      {description && (
        <span id={descriptionId} {...stylex.props(styles.linkDescription)}>
          {description}
        </span>
      )}
    </BaseNavigationMenu.Link>
  );
}

export function NavigationMenuTriggerLink({
  closeOnClick = true,
  ...props
}: NavigationMenuTriggerLinkProps) {
  return (
    <BaseNavigationMenu.Link
      {...props}
      closeOnClick={closeOnClick}
      className={(state) =>
        stylex.props(styles.control, state.active && styles.openControl).className
      }
    />
  );
}
