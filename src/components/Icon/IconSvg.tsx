import * as stylex from '@stylexjs/stylex';
import type { ComponentProps, ReactNode } from 'react';

export type IconSvgProps = Omit<
  ComponentProps<'svg'>,
  | 'aria-hidden'
  | 'aria-label'
  | 'children'
  | 'className'
  | 'focusable'
  | 'height'
  | 'role'
  | 'style'
  | 'viewBox'
  | 'width'
> & {
  children: ReactNode;
  height: string;
  label?: string;
  viewBox: string;
  width: string;
};

export type IconComponentProps = Pick<IconSvgProps, 'label'>;

const styles = stylex.create({
  root: {
    display: 'block',
    flexShrink: 0,
    height: '24px',
    objectFit: 'contain',
    width: 'auto'
  }
});

export function IconSvg({ children, label, ...props }: IconSvgProps) {
  return (
    <svg
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      focusable="false"
      role={label === undefined ? undefined : 'img'}
      {...props}
      {...stylex.props(styles.root)}
    >
      {children}
    </svg>
  );
}
