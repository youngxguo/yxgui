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

export type CardProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type CardHeaderProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type CardTitleProps = Omit<ComponentProps<'h3'>, 'className' | 'style'>;
export type CardDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;
export type CardActionProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type CardContentProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;
export type CardFooterProps = Omit<ComponentProps<'div'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderMuted,
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: colors.text,
    display: 'grid',
    fontFamily: fontFamilies.sans,
    gap: spacing.lg,
    padding: spacing.lg
  },
  header: {
    columnGap: spacing.lg,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    rowGap: spacing.sm
  },
  title: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    gridColumn: 1,
    lineHeight: lineHeights.lg,
    margin: 0
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    gridColumn: 1,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  action: {
    alignItems: 'flex-start',
    display: 'flex',
    gridColumn: 2,
    gridRow: '1 / span 2',
    justifyContent: 'flex-end'
  },
  content: { minWidth: 0 },
  footer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'flex-end'
  }
});

export function Card(props: CardProps) {
  return <div {...props} {...stylex.props(styles.root)} />;
}

export function CardHeader(props: CardHeaderProps) {
  return <div {...props} {...stylex.props(styles.header)} />;
}

export function CardTitle(props: CardTitleProps) {
  return <h3 {...props} {...stylex.props(styles.title)} />;
}

export function CardDescription(props: CardDescriptionProps) {
  return <p {...props} {...stylex.props(styles.description)} />;
}

export function CardAction(props: CardActionProps) {
  return <div {...props} {...stylex.props(styles.action)} />;
}

export function CardContent(props: CardContentProps) {
  return <div {...props} {...stylex.props(styles.content)} />;
}

export function CardFooter(props: CardFooterProps) {
  return <div {...props} {...stylex.props(styles.footer)} />;
}
