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

export type LinkProps = Omit<ComponentProps<'a'>, 'className' | 'color' | 'style'>;

const styles = stylex.create({
  root: {
    alignItems: 'center',
    color: {
      default: colors.primary,
      ':hover': colors.primaryHover
    },
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    gap: spacing.sm,
    lineHeight: lineHeights.sm,
    textDecoration: 'underline',
    textUnderlineOffset: '2px'
  }
});

export function Link(props: LinkProps) {
  return <a {...props} {...stylex.props(styles.root)} />;
}
