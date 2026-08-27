import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { spacing } from '../../theme/foundations.stylex';

export type IconComponentProps = {
  color?: string;
  label?: string;
};

type IconSvgProps = IconComponentProps & {
  children: ReactNode;
};

const styles = stylex.create({
  root: {
    display: 'block',
    flexShrink: 0,
    height: spacing.xl,
    objectFit: 'contain',
    width: spacing.xl
  }
});

export function IconSvg({ children, color, label }: IconSvgProps) {
  return (
    <svg
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      color={color}
      fill="currentColor"
      focusable="false"
      height={spacing.xl}
      role={label === undefined ? undefined : 'img'}
      viewBox="0 0 24 24"
      width={spacing.xl}
      xmlns="http://www.w3.org/2000/svg"
      {...stylex.props(styles.root)}
    >
      {children}
    </svg>
  );
}
