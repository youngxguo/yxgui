import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type AppShellProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type AppShellSidebarProps = Omit<ComponentProps<'aside'>, 'className' | 'style'>;
export type AppShellHeaderProps = Omit<ComponentProps<'header'>, 'className' | 'style'>;
export type AppShellMainProps = Omit<ComponentProps<'main'>, 'className' | 'style'>;
export type AppShellFooterProps = Omit<ComponentProps<'footer'>, 'className' | 'style'>;
export type SidebarHeaderProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type SidebarContentProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type SidebarFooterProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type SidebarNavProps = Omit<ComponentProps<'nav'>, 'aria-label' | 'className' | 'style'> & {
  label: string;
};
export type SidebarGroupProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type SidebarGroupLabelProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type SidebarLinkProps = Omit<ComponentProps<'a'>, 'className' | 'style'> & {
  active?: boolean;
};
export type SidebarButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'> & {
  active?: boolean;
};

const styles = stylex.create({
  shell: {
    backgroundColor: colors.surface,
    color: colors.text,
    display: 'grid',
    fontFamily: fontFamilies.sans,
    gridTemplateAreas: {
      default: '"sidebar" "header" "main" "footer"',
      '@media (min-width: 768px)': '"sidebar header" "sidebar main" "sidebar footer"'
    },
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      '@media (min-width: 768px)': '240px minmax(0, 1fr)'
    },
    gridTemplateRows: {
      default: 'auto auto minmax(0, 1fr) auto',
      '@media (min-width: 768px)': 'auto minmax(0, 1fr) auto'
    },
    minHeight: '100vh'
  },
  sidebar: {
    backgroundColor: colors.surfaceElevated,
    borderBlockEndColor: colors.borderMuted,
    borderBlockEndStyle: { default: 'solid', '@media (min-width: 768px)': 'none' },
    borderBlockEndWidth: { default: '1px', '@media (min-width: 768px)': 0 },
    borderInlineEndColor: colors.borderMuted,
    borderInlineEndStyle: { default: 'none', '@media (min-width: 768px)': 'solid' },
    borderInlineEndWidth: { default: 0, '@media (min-width: 768px)': '1px' },
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamilies.sans,
    gap: spacing.lg,
    gridArea: 'sidebar',
    minWidth: 0,
    padding: spacing.lg
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderBlockEndColor: colors.borderMuted,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: '1px',
    display: 'flex',
    fontFamily: fontFamilies.sans,
    gap: spacing.lg,
    gridArea: 'header',
    justifyContent: 'space-between',
    minWidth: 0,
    padding: spacing.lg
  },
  main: {
    fontFamily: fontFamilies.sans,
    gridArea: 'main',
    minWidth: 0,
    padding: spacing.xl
  },
  footer: {
    borderBlockStartColor: colors.borderMuted,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: '1px',
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    gridArea: 'footer',
    lineHeight: lineHeights.sm,
    padding: spacing.lg
  },
  sidebarHeader: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    gap: spacing.md,
    lineHeight: lineHeights.md,
    minWidth: 0
  },
  sidebarContent: {
    display: 'grid',
    flex: 1,
    fontFamily: fontFamilies.sans,
    gap: spacing.lg,
    minHeight: 0,
    overflow: 'auto'
  },
  sidebarFooter: {
    alignItems: 'center',
    borderBlockStartColor: colors.borderMuted,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: '1px',
    display: 'flex',
    fontFamily: fontFamilies.sans,
    gap: spacing.md,
    paddingBlockStart: spacing.lg
  },
  nav: { display: 'grid', fontFamily: fontFamilies.sans, gap: spacing.md },
  group: { display: 'grid', gap: spacing.sm },
  groupLabel: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    paddingInline: spacing.md,
    textTransform: 'uppercase'
  },
  control: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceSubtle,
      ':disabled': 'transparent'
    },
    borderColor: 'transparent',
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: { default: colors.text, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    gap: spacing.md,
    lineHeight: lineHeights.sm,
    minWidth: 0,
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '1px',
    paddingBlock: spacing.md,
    paddingInline: spacing.md,
    textAlign: 'left',
    textDecoration: 'none',
    width: '100%'
  },
  active: { backgroundColor: colors.surfaceSubtle, color: colors.primary }
});

export function AppShell(props: AppShellProps) {
  return <div {...props} {...stylex.props(styles.shell)} />;
}

export function AppShellSidebar(props: AppShellSidebarProps) {
  return <aside {...props} {...stylex.props(styles.sidebar)} />;
}

export function AppShellHeader(props: AppShellHeaderProps) {
  return <header {...props} {...stylex.props(styles.header)} />;
}

export function AppShellMain(props: AppShellMainProps) {
  return <main {...props} {...stylex.props(styles.main)} />;
}

export function AppShellFooter(props: AppShellFooterProps) {
  return <footer {...props} {...stylex.props(styles.footer)} />;
}

export function SidebarHeader(props: SidebarHeaderProps) {
  return <div {...props} {...stylex.props(styles.sidebarHeader)} />;
}

export function SidebarContent(props: SidebarContentProps) {
  return <div {...props} {...stylex.props(styles.sidebarContent)} />;
}

export function SidebarFooter(props: SidebarFooterProps) {
  return <div {...props} {...stylex.props(styles.sidebarFooter)} />;
}

export function SidebarNav({ label, ...props }: SidebarNavProps) {
  return <nav {...props} aria-label={label} {...stylex.props(styles.nav)} />;
}

export function SidebarGroup(props: SidebarGroupProps) {
  return <div {...props} {...stylex.props(styles.group)} />;
}

export function SidebarGroupLabel(props: SidebarGroupLabelProps) {
  return <div {...props} {...stylex.props(styles.groupLabel)} />;
}

export function SidebarLink({
  active = false,
  'aria-current': ariaCurrent,
  ...props
}: SidebarLinkProps) {
  return (
    <a
      {...props}
      aria-current={active ? 'page' : ariaCurrent}
      {...stylex.props(styles.control, active && styles.active)}
    />
  );
}

export function SidebarButton({
  active = false,
  'aria-current': ariaCurrent,
  ...props
}: SidebarButtonProps) {
  return (
    <button
      {...props}
      aria-current={active ? 'page' : ariaCurrent}
      {...stylex.props(styles.control, active && styles.active)}
    />
  );
}
