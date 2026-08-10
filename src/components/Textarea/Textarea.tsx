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

type TextareaProps = Omit<ComponentProps<'textarea'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    backgroundColor: {
      default: colors.surface,
      ':disabled': colors.surfaceDisabled
    },
    borderColor: {
      default: colors.border,
      ':disabled': colors.borderDisabled
    },
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

export function Textarea(props: TextareaProps) {
  return <textarea {...props} {...stylex.props(styles.root)} />;
}
