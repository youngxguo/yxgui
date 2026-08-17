import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, lineHeights, spacing } from '../../theme/foundations.stylex';

export type BreadcrumbProps = Omit<ComponentProps<'nav'>, 'className' | 'style'>;
export type BreadcrumbListProps = Omit<ComponentProps<'ol'>, 'className' | 'style'>;
export type BreadcrumbItemProps = Omit<ComponentProps<'li'>, 'className' | 'style'>;
export type BreadcrumbLinkProps = Omit<ComponentProps<'a'>, 'className' | 'style'>;
export type BreadcrumbCurrentProps = Omit<
  ComponentProps<'span'>,
  'aria-current' | 'className' | 'style'
>;
export type BreadcrumbSeparatorProps = Omit<
  ComponentProps<'span'>,
  'aria-hidden' | 'className' | 'style'
>;
export type BreadcrumbEllipsisProps = Omit<
  ComponentProps<'span'>,
  'aria-hidden' | 'children' | 'className' | 'style'
>;

const styles = stylex.create({
  root: { fontFamily: fontFamilies.sans },
  list: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  item: { alignItems: 'center', display: 'inline-flex', gap: spacing.md },
  text: { fontSize: fontSizes.sm, lineHeight: lineHeights.sm },
  link: {
    color: { default: colors.primary, ':hover': colors.primaryHover },
    textDecoration: { default: 'none', ':hover': 'underline' }
  },
  current: { color: colors.text, fontWeight: 600 },
  separator: { color: colors.textMuted, userSelect: 'none' },
  ellipsis: { color: colors.textMuted, letterSpacing: '0.08em', userSelect: 'none' }
});

export function Breadcrumb({ 'aria-label': ariaLabel = 'Breadcrumb', ...props }: BreadcrumbProps) {
  return <nav {...props} aria-label={ariaLabel} {...stylex.props(styles.root)} />;
}
export function BreadcrumbList(props: BreadcrumbListProps) {
  return <ol {...props} {...stylex.props(styles.list)} />;
}
export function BreadcrumbItem(props: BreadcrumbItemProps) {
  return <li {...props} {...stylex.props(styles.item)} />;
}
export function BreadcrumbLink(props: BreadcrumbLinkProps) {
  return <a {...props} {...stylex.props(styles.text, styles.link)} />;
}
export function BreadcrumbCurrent(props: BreadcrumbCurrentProps) {
  return <span {...props} aria-current="page" {...stylex.props(styles.text, styles.current)} />;
}
export function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  return <span {...props} aria-hidden="true" {...stylex.props(styles.text, styles.separator)} />;
}
export function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps) {
  return (
    <span {...props} aria-hidden="true" {...stylex.props(styles.text, styles.ellipsis)}>
      …
    </span>
  );
}
