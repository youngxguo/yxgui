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
export type ItemSize = 'xs' | 'sm' | 'md';
export type ItemVariant = 'default' | 'outline' | 'muted';
type ItemOptions = { size?: ItemSize; variant?: ItemVariant };
export type ItemProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & ItemOptions;
export type ItemLinkProps = Omit<ComponentProps<'a'>, 'className' | 'style'> & ItemOptions;
export type ItemButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'> & ItemOptions;
export type ItemMediaProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemContentProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemTitleProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type ItemActionsProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemHeaderProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemFooterProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type ItemSeparatorProps = Omit<ComponentProps<'div'>, 'children' | 'className' | 'style'>;

const styles = stylex.create({
  group: { display: 'grid', gap: spacing.md },
  root: {
    alignItems: 'center',
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: colors.text,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: fontFamilies.sans,
    minWidth: 0,
    width: '100%'
  },
  default: { backgroundColor: 'transparent', borderColor: 'transparent' },
  outline: { backgroundColor: colors.surfaceElevated, borderColor: colors.borderMuted },
  muted: { backgroundColor: colors.surfaceSubtle, borderColor: 'transparent' },
  xs: { gap: spacing.sm, padding: spacing.sm },
  sm: { gap: spacing.md, padding: spacing.md },
  md: { gap: spacing.lg, padding: spacing.lg },
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
  interactiveDefault: {
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.surfaceSubtle,
      ':disabled': colors.surfaceDisabled
    }
  },
  interactiveMuted: {
    backgroundColor: {
      default: colors.surfaceSubtle,
      ':hover': colors.surfaceElevated,
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
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.md,
    flexBasis: '100%',
    justifyContent: 'space-between',
    minWidth: 0
  },
  footer: {
    alignItems: 'center',
    color: colors.textMuted,
    display: 'flex',
    fontSize: fontSizes.sm,
    gap: spacing.md,
    flexBasis: '100%',
    justifyContent: 'space-between',
    lineHeight: lineHeights.sm,
    minWidth: 0
  },
  separator: { backgroundColor: colors.borderMuted, height: '1px', width: '100%' }
});

export function ItemGroup(props: ItemGroupProps) {
  return <div {...props} {...stylex.props(styles.group)} />;
}

export function Item({ size = 'md', variant = 'outline', ...props }: ItemProps) {
  return <div {...props} {...stylex.props(styles.root, styles[variant], styles[size])} />;
}

export function ItemLink({ size = 'md', variant = 'outline', ...props }: ItemLinkProps) {
  return (
    <a
      {...props}
      {...stylex.props(
        styles.root,
        styles[variant],
        styles[size],
        styles.interactive,
        variant === 'outline'
          ? styles.interactiveBackground
          : variant === 'muted'
            ? styles.interactiveMuted
            : styles.interactiveDefault
      )}
    />
  );
}

export function ItemButton({ size = 'md', variant = 'outline', ...props }: ItemButtonProps) {
  return (
    <button
      {...props}
      {...stylex.props(
        styles.root,
        styles[variant],
        styles[size],
        styles.interactive,
        variant === 'outline'
          ? styles.interactiveBackground
          : variant === 'muted'
            ? styles.interactiveMuted
            : styles.interactiveDefault
      )}
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

export function ItemHeader(props: ItemHeaderProps) {
  return <div {...props} {...stylex.props(styles.header)} />;
}

export function ItemFooter(props: ItemFooterProps) {
  return <div {...props} {...stylex.props(styles.footer)} />;
}

export function ItemSeparator({
  'aria-orientation': ariaOrientation = 'horizontal',
  role = 'separator',
  ...props
}: ItemSeparatorProps) {
  return (
    <div
      {...props}
      aria-orientation={ariaOrientation}
      role={role}
      {...stylex.props(styles.separator)}
    />
  );
}
