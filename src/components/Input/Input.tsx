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

type InputProps = Omit<ComponentProps<'input'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    backgroundColor: {
      default: colors.surface,
      ':disabled': colors.surfaceDisabled
    },
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: {
      default: colors.text,
      ':disabled': colors.textDisabled
    },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.sm,
    padding: spacing.md,
    '::placeholder': {
      color: {
        default: colors.textMuted,
        ':disabled': colors.textDisabled
      }
    }
  }
});

export function Input(props: InputProps) {
  return <input {...props} {...stylex.props(styles.root)} />;
}
