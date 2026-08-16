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
export type EmptyTitleProps = Omit<ComponentProps<'h2'>, 'className' | 'style'>;
export type EmptyDescriptionProps = Omit<ComponentProps<'p'>, 'className' | 'style'>;

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
  text: { fontFamily: fontFamilies.sans, margin: 0 },
  title: {
    color: colors.text,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.md
  },
  description: { color: colors.textMuted, fontSize: fontSizes.sm, lineHeight: lineHeights.sm }
});

export function Empty(props: EmptyProps) {
  return <section {...props} {...stylex.props(styles.root)} />;
}

export function EmptyTitle(props: EmptyTitleProps) {
  return <h2 {...props} {...stylex.props(styles.text, styles.title)} />;
}

export function EmptyDescription(props: EmptyDescriptionProps) {
  return <p {...props} {...stylex.props(styles.text, styles.description)} />;
}
