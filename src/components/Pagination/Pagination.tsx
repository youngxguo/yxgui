import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type PaginationProps = Omit<ComponentProps<'nav'>, 'className' | 'style'>;
export type PaginationListProps = Omit<ComponentProps<'ul'>, 'className' | 'style'>;
export type PaginationItemProps = Omit<ComponentProps<'li'>, 'className' | 'style'>;
export type PaginationLinkProps = Omit<
  ComponentProps<'a'>,
  'aria-current' | 'className' | 'style'
> & { current?: boolean };

const styles = stylex.create({
  root: { fontFamily: fontFamilies.sans },
  list: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.sm,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  item: { display: 'contents' },
  link: {
    alignItems: 'center',
    borderColor: colors.borderMuted,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.text, ':hover': colors.primary },
    display: 'inline-flex',
    fontSize: fontSizes.sm,
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    minHeight: '32px',
    minWidth: '32px',
    paddingInline: spacing.md,
    textDecoration: 'none'
  },
  current: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.onEmphasis
  }
});

export function Pagination({ 'aria-label': ariaLabel = 'Pagination', ...props }: PaginationProps) {
  return <nav {...props} aria-label={ariaLabel} {...stylex.props(styles.root)} />;
}
export function PaginationList(props: PaginationListProps) {
  return <ul {...props} {...stylex.props(styles.list)} />;
}
export function PaginationItem(props: PaginationItemProps) {
  return <li {...props} {...stylex.props(styles.item)} />;
}
export function PaginationLink({ current = false, ...props }: PaginationLinkProps) {
  return (
    <a
      {...props}
      aria-current={current ? 'page' : undefined}
      {...stylex.props(styles.link, current && styles.current)}
    />
  );
}
