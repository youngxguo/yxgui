import * as stylex from '@stylexjs/stylex';
import { colors } from '../theme/colors.stylex';

export const actionVariantStyles = stylex.create({
  primary: {
    backgroundColor: {
      default: colors.primary,
      ':enabled:hover': colors.primaryHover,
      ':disabled': colors.surfaceDisabled
    },
    borderColor: { default: 'transparent', ':disabled': colors.borderDisabled },
    color: { default: colors.onEmphasis, ':disabled': colors.textDisabled }
  },
  secondary: {
    backgroundColor: {
      default: colors.surfaceElevated,
      ':enabled:hover': colors.surfaceSubtle,
      ':disabled': colors.surfaceDisabled
    },
    borderColor: { default: colors.border, ':disabled': colors.borderDisabled },
    color: { default: colors.text, ':disabled': colors.textDisabled }
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':enabled:hover': colors.surfaceSubtle,
      ':disabled': 'transparent'
    },
    borderColor: 'transparent',
    color: { default: colors.text, ':disabled': colors.textDisabled }
  },
  danger: {
    backgroundColor: {
      default: colors.danger,
      ':enabled:hover': colors.dangerHover,
      ':disabled': colors.surfaceDisabled
    },
    borderColor: { default: 'transparent', ':disabled': colors.borderDisabled },
    color: { default: colors.onEmphasis, ':disabled': colors.textDisabled }
  }
});
