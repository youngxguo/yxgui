import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing
} from '../../theme/foundations.stylex';

export type PageSectionProps = Omit<ComponentProps<'section'>, 'className' | 'style'>;
export type PageSectionHeaderProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type PageSectionHeadingProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type PageSectionTitleProps = Omit<ComponentProps<'h2'>, 'className' | 'style'>;
export type PageSectionDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type PageSectionActionsProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type PageSectionContentProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;

const styles = stylex.create({
  root: { display: 'grid', fontFamily: fontFamilies.sans, gap: spacing.lg },
  header: {
    alignItems: { default: 'stretch', '@media (min-width: 640px)': 'flex-start' },
    display: 'flex',
    flexDirection: { default: 'column', '@media (min-width: 640px)': 'row' },
    fontFamily: fontFamilies.sans,
    gap: spacing.md,
    justifyContent: 'space-between'
  },
  heading: {
    display: 'grid',
    flex: 1,
    fontFamily: fontFamilies.sans,
    gap: spacing.sm,
    minWidth: 0
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
    margin: 0,
    maxWidth: '640px'
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    flexWrap: 'wrap',
    fontFamily: fontFamilies.sans,
    gap: spacing.md
  },
  content: { fontFamily: fontFamilies.sans, minWidth: 0 }
});

export function PageSection(props: PageSectionProps) {
  return <section {...props} {...stylex.props(styles.root)} />;
}

export function PageSectionHeader(props: PageSectionHeaderProps) {
  return <div {...props} {...stylex.props(styles.header)} />;
}

export function PageSectionHeading(props: PageSectionHeadingProps) {
  return <div {...props} {...stylex.props(styles.heading)} />;
}

export function PageSectionTitle(props: PageSectionTitleProps) {
  return <h2 {...props} {...stylex.props(styles.title)} />;
}

export function PageSectionDescription(props: PageSectionDescriptionProps) {
  return <p {...props} {...stylex.props(styles.description)} />;
}

export function PageSectionActions(props: PageSectionActionsProps) {
  return <div {...props} {...stylex.props(styles.actions)} />;
}

export function PageSectionContent(props: PageSectionContentProps) {
  return <div {...props} {...stylex.props(styles.content)} />;
}
