import { Input as BaseInput } from '@base-ui/react/input';
import * as stylex from '@stylexjs/stylex';
import type { Ref } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../../theme/foundations.stylex';

export type InputProps = Omit<BaseInput.Props, 'className' | 'render' | 'style'> & {
  fullWidth?: boolean;
  ref?: Ref<HTMLInputElement>;
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

export function Input({
  'aria-invalid': ariaInvalid,
  fullWidth = false,
  ref,
  ...props
}: InputProps) {
  const invalid = ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== 'false';

  return (
    <BaseInput
      {...props}
      aria-invalid={ariaInvalid}
      className={(state) =>
        stylex.props(
          styles.root,
          fullWidth && styles.fullWidth,
          (invalid || state.valid === false) && styles.invalid
        ).className
      }
      ref={ref as Ref<HTMLElement>}
    />
  );
}
