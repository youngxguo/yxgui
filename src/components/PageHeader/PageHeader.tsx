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

export type PageHeaderProps = Omit<ComponentProps<'header'>, 'className' | 'style'>;
export type PageHeaderContentProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type PageHeaderTitleProps = Omit<ComponentProps<'h1'>, 'className' | 'style'>;
export type PageHeaderDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type PageHeaderActionsProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    alignItems: { default: 'stretch', '@media (min-width: 640px)': 'flex-start' },
    borderBlockEndColor: colors.borderMuted,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: '1px',
    display: 'flex',
    flexDirection: { default: 'column', '@media (min-width: 640px)': 'row' },
    fontFamily: fontFamilies.sans,
    gap: spacing.lg,
    justifyContent: 'space-between',
    paddingBlockEnd: spacing.xl
  },
  content: {
    display: 'grid',
    flex: 1,
    fontFamily: fontFamilies.sans,
    gap: spacing.md,
    minWidth: 0
  },
  title: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.xl,
    margin: 0
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
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
  }
});

export function PageHeader(props: PageHeaderProps) {
  return <header {...props} {...stylex.props(styles.root)} />;
}

export function PageHeaderContent(props: PageHeaderContentProps) {
  return <div {...props} {...stylex.props(styles.content)} />;
}

export function PageHeaderTitle(props: PageHeaderTitleProps) {
  return <h1 {...props} {...stylex.props(styles.title)} />;
}

export function PageHeaderDescription(props: PageHeaderDescriptionProps) {
  return <p {...props} {...stylex.props(styles.description)} />;
}

export function PageHeaderActions(props: PageHeaderActionsProps) {
  return <div {...props} {...stylex.props(styles.actions)} />;
}
