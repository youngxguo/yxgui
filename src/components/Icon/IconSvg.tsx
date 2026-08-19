import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';

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
    height: '24px',
    objectFit: 'contain',
    width: 'auto'
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
      height="24"
      role={label === undefined ? undefined : 'img'}
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...stylex.props(styles.root)}
    >
      {children}
    </svg>
  );
}
