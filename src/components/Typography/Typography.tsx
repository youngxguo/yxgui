import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, fontWeights, lineHeights } from '../../theme/foundations.stylex';

export type TypographyProps = Omit<
  ComponentPropsWithoutRef<'p'>,
  'className' | 'color' | 'style'
> & {
  color?: 'default' | 'muted';
  variant?: 'body' | 'h1' | 'h2';
};

const styles = stylex.create({
  root: {
    fontFamily: fontFamilies.sans,
    margin: 0
  },
  default: {
    color: colors.text
  },
  muted: {
    color: colors.textMuted
  },
  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.md
  },
  h1: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.xl
  },
  h2: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lg
  }
});

export function Typography({ color = 'default', variant = 'body', ...props }: TypographyProps) {
  const colorStyle = color === 'muted' ? styles.muted : styles.default;
  const style = variant === 'h1' ? styles.h1 : variant === 'h2' ? styles.h2 : styles.body;
  const styleProps = stylex.props(styles.root, colorStyle, style);

  if (variant === 'h1') {
    return <h1 {...props} {...styleProps} />;
  }

  if (variant === 'h2') {
    return <h2 {...props} {...styleProps} />;
  }

  return <p {...props} {...styleProps} />;
}
