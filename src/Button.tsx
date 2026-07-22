import * as stylex from '@stylexjs/stylex';
import type { ComponentPropsWithoutRef } from 'react';
import { colors, control, radii, typography } from './tokens.stylex';

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'style'>;

const styles = stylex.create({
  root: {
    borderColor: 'transparent',
    borderRadius: radii.control,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: control.gap,
    paddingInline: control.paddingInline,
    alignItems: 'center',
    backgroundColor: {
      default: colors.accentSolid,
      ':active:not(:disabled)': colors.accentSolidPressed,
      ':hover:not(:disabled)': colors.accentSolidHover
    },
    boxSizing: 'border-box',
    color: colors.accentContrast,
    cursor: {
      default: 'pointer',
      ':disabled': 'not-allowed'
    },
    display: 'inline-flex',
    fontFamily: typography.labelFamily,
    fontSize: typography.labelSize,
    fontWeight: typography.labelWeight,
    justifyContent: 'center',
    letterSpacing: typography.labelLetterSpacing,
    lineHeight: typography.labelLineHeight,
    opacity: {
      default: 1,
      ':disabled': 0.5
    },
    outlineColor: {
      default: 'transparent',
      ':focus-visible': colors.focusRing
    },
    outlineOffset: 3,
    outlineStyle: 'solid',
    outlineWidth: 2,
    userSelect: 'none',
    height: control.height
  }
});

export function Button({ type = 'button', ...props }: ButtonProps) {
  return <button type={type} {...props} {...stylex.props(styles.root)} />;
}
