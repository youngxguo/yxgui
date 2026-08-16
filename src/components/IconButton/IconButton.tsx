import * as stylex from '@stylexjs/stylex';
import type { ComponentProps, ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import { fontFamilies, radii } from '../../theme/foundations.stylex';
import { actionVariantStyles } from '../actionStyles.stylex';
import type { ButtonSize, ButtonVariant } from '../Button';

export type IconButtonProps = Omit<
  ComponentProps<'button'>,
  'aria-label' | 'children' | 'className' | 'style'
> & {
  children: ReactNode;
  label: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    borderRadius: radii.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    display: 'inline-flex',
    flexShrink: 0,
    fontFamily: fontFamilies.sans,
    fontSize: '20px',
    justifyContent: 'center',
    lineHeight: 1,
    outline: { default: 'none', ':focus-visible': `2px solid ${colors.primary}` },
    outlineOffset: '2px',
    padding: 0
  },
  sm: { height: '30px', width: '30px' },
  md: { height: '38px', width: '38px' }
});

export function IconButton({
  children,
  label,
  size = 'md',
  variant = 'primary',
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      aria-label={label}
      {...stylex.props(styles.root, actionVariantStyles[variant], styles[size])}
    >
      {children}
    </button>
  );
}
