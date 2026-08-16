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

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'className' | 'style'> & {
  fullWidth?: boolean;
};

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
  },
  fullWidth: {
    width: '100%'
  },
  invalid: {
    borderColor: colors.danger
  }
});

export function Textarea({
  'aria-invalid': ariaInvalid,
  fullWidth = false,
  ...props
}: TextareaProps) {
  const invalid = ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== 'false';

  return (
    <textarea
      {...props}
      aria-invalid={ariaInvalid}
      {...stylex.props(styles.root, fullWidth && styles.fullWidth, invalid && styles.invalid)}
    />
  );
}
