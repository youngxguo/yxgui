import * as stylex from '@stylexjs/stylex';
import { colors } from '../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing
} from '../theme/foundations.stylex';

export const fieldControlStyles = stylex.create({
  field: { display: 'grid', gap: spacing.sm, maxWidth: '100%', width: '320px' },
  fullWidth: { width: '100%' },
  label: {
    color: colors.text,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.sm
  },
  group: {
    alignItems: 'stretch',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    minHeight: '38px',
    overflow: 'hidden'
  },
  invalid: { borderColor: colors.danger },
  disabled: { backgroundColor: colors.surfaceDisabled, borderColor: colors.borderDisabled },
  input: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: { default: colors.text, '::placeholder': colors.textMuted },
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    minWidth: 0,
    outline: 'none',
    paddingBlock: spacing.md,
    paddingInline: spacing.md
  },
  disabledInput: { color: colors.textDisabled },
  action: {
    alignItems: 'center',
    backgroundColor: { default: 'transparent', ':enabled:hover': colors.surfaceSubtle },
    borderWidth: 0,
    color: { default: colors.textMuted, ':disabled': colors.textDisabled },
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    justifyContent: 'center',
    minWidth: '44px',
    paddingInline: spacing.md
  },
  description: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  },
  error: {
    color: colors.danger,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    margin: 0
  }
});
