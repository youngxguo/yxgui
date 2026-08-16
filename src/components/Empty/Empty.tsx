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

export type EmptyProps = Omit<ComponentProps<'section'>, 'className' | 'style'>;
export type EmptyHeaderProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type EmptyMediaProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  variant?: 'default' | 'icon';
};
export type EmptyTitleProps = Omit<ComponentProps<'h2'>, 'className' | 'style'>;
export type EmptyDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type EmptyContentProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'dashed',
    borderWidth: '1px',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    padding: spacing.xl,
    textAlign: 'center'
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    maxWidth: '480px'
  },
  media: {
    alignItems: 'center',
    color: colors.textMuted,
    display: 'flex',
    justifyContent: 'center'
  },
  mediaIcon: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.full,
    color: colors.primary,
    height: '48px',
    width: '48px'
  },
  text: { fontFamily: fontFamilies.sans, margin: 0 },
  title: {
    color: colors.text,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.md
  },
  description: { color: colors.textMuted, fontSize: fontSizes.sm, lineHeight: lineHeights.sm },
  content: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
    maxWidth: '480px'
  }
});

export function Empty(props: EmptyProps) {
  return <section {...props} {...stylex.props(styles.root)} />;
}

export function EmptyHeader(props: EmptyHeaderProps) {
  return <div {...props} {...stylex.props(styles.header)} />;
}

export function EmptyMedia({ variant = 'default', ...props }: EmptyMediaProps) {
  return <div {...props} {...stylex.props(styles.media, variant === 'icon' && styles.mediaIcon)} />;
}

export function EmptyTitle(props: EmptyTitleProps) {
  return <h2 {...props} {...stylex.props(styles.text, styles.title)} />;
}

export function EmptyDescription(props: EmptyDescriptionProps) {
  return <p {...props} {...stylex.props(styles.text, styles.description)} />;
}

export function EmptyContent(props: EmptyContentProps) {
  return <div {...props} {...stylex.props(styles.content)} />;
}
