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

export type KbdProps = Omit<ComponentProps<'kbd'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    backgroundColor: colors.surfaceSubtle,
    borderBottomColor: colors.border,
    borderBottomWidth: '2px',
    borderColor: colors.borderMuted,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: colors.text,
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    minWidth: '24px',
    paddingInline: spacing.sm,
    whiteSpace: 'nowrap'
  }
});

export function Kbd(props: KbdProps) {
  return <kbd {...props} {...stylex.props(styles.root)} />;
}
