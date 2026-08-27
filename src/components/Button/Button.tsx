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

type ButtonProps = Omit<ComponentProps<'button'>, 'className' | 'style'> & {
  variant?: 'primary' | 'ghost';
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    gap: spacing.md,
    justifyContent: 'center',
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.md,
    paddingInline: spacing.lg
  },
  primary: {
    backgroundColor: {
      default: colors.primary,
      ':enabled:hover': colors.primaryHover,
      ':disabled': colors.surfaceDisabled
    },
    borderColor: {
      default: 'transparent',
      ':disabled': colors.borderDisabled
    },
    color: {
      default: colors.onEmphasis,
      ':disabled': colors.textDisabled
    }
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':enabled:hover': colors.surfaceHover,
      ':disabled': 'transparent'
    },
    borderColor: 'transparent',
    color: {
      default: colors.text,
      ':disabled': colors.textDisabled
    }
  }
});

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      {...stylex.props(styles.root, variant === 'ghost' ? styles.ghost : styles.primary)}
    />
  );
}
