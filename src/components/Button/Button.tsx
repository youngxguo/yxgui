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

type ButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: {
      default: colors.primary,
      ':enabled:hover': colors.primaryHover,
      ':disabled': colors.surfaceDisabled
    },
    borderColor: {
      default: 'transparent',
      ':disabled': colors.borderDisabled
    },
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: {
      default: colors.onEmphasis,
      ':disabled': colors.textDisabled
    },
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    gap: spacing.md,
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.lg
  }
});

export function Button(props: ButtonProps) {
  return <button {...props} {...stylex.props(styles.root)} />;
}
