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

export type ItemGroupProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemLinkProps = Omit<ComponentProps<'a'>, 'className' | 'style'>;
export type ItemButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'>;
export type ItemMediaProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemContentProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemTitleProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type ItemActionsProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;

const styles = stylex.create({
  group: { display: 'grid', gap: spacing.md },
  root: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: colors.text,
    display: 'flex',
    fontFamily: fontFamilies.sans,
    gap: spacing.lg,
    minWidth: 0,
    padding: spacing.lg,
    width: '100%'
  },
  interactive: {
    appearance: 'none',
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    opacity: { default: 1, ':disabled': 0.6 },
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '2px',
    textAlign: 'left',
    textDecoration: 'none'
  },
  interactiveBackground: {
    backgroundColor: {
      default: colors.surfaceElevated,
      ':hover': colors.surfaceSubtle,
      ':disabled': colors.surfaceDisabled
    }
  },
  media: {
    alignItems: 'center',
    display: 'inline-flex',
    flexShrink: 0,
    justifyContent: 'center'
  },
  content: { display: 'grid', flex: 1, gap: spacing.sm, minWidth: 0 },
  title: {
    color: colors.text,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm,
    minWidth: 0
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0,
    minWidth: 0
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    gap: spacing.md
  }
});

export function ItemGroup(props: ItemGroupProps) {
  return <div {...props} {...stylex.props(styles.group)} />;
}

export function Item(props: ItemProps) {
  return <div {...props} {...stylex.props(styles.root)} />;
}

export function ItemLink(props: ItemLinkProps) {
  return (
    <a
      {...props}
      {...stylex.props(styles.root, styles.interactive, styles.interactiveBackground)}
    />
  );
}

export function ItemButton(props: ItemButtonProps) {
  return (
    <button
      {...props}
      {...stylex.props(styles.root, styles.interactive, styles.interactiveBackground)}
    />
  );
}

export function ItemMedia(props: ItemMediaProps) {
  return <div {...props} {...stylex.props(styles.media)} />;
}

export function ItemContent(props: ItemContentProps) {
  return <div {...props} {...stylex.props(styles.content)} />;
}

export function ItemTitle(props: ItemTitleProps) {
  return <div {...props} {...stylex.props(styles.title)} />;
}

export function ItemDescription(props: ItemDescriptionProps) {
  return <p {...props} {...stylex.props(styles.description)} />;
}

export function ItemActions(props: ItemActionsProps) {
  return <div {...props} {...stylex.props(styles.actions)} />;
}
