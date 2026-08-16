import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, fontSizes, radii, spacing } from '../../theme/foundations.stylex';

export type SelectProps = Omit<ComponentProps<'select'>, 'className' | 'style'> & {
  fullWidth?: boolean;
};

const styles = stylex.create({
  root: {
    backgroundColor: { default: colors.surface, ':disabled': colors.surfaceDisabled },
    borderColor: { default: colors.border, ':disabled': colors.borderDisabled },
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: { default: colors.text, ':disabled': colors.textDisabled },
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    minHeight: '38px',
    paddingBlock: spacing.md,
    paddingInline: spacing.md
  },
  fullWidth: { width: '100%' },
  invalid: { borderColor: colors.danger }
});

export function Select({ 'aria-invalid': ariaInvalid, fullWidth = false, ...props }: SelectProps) {
  const invalid = ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== 'false';
  return (
    <select
      {...props}
      aria-invalid={ariaInvalid}
      {...stylex.props(styles.root, fullWidth && styles.fullWidth, invalid && styles.invalid)}
    />
  );
}
