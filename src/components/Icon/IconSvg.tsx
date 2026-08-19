import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';

export type IconSvgProps = ComponentProps<'svg'>;

const styles = stylex.create({
  root: {
    display: 'block',
    flexShrink: 0,
    height: '24px',
    objectFit: 'contain',
    width: 'auto'
  }
});

export function IconSvg({
  fill = 'none',
  height = '24',
  stroke = 'currentColor',
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  strokeWidth = '2',
  viewBox = '0 0 24 24',
  width = '24',
  xmlns = 'http://www.w3.org/2000/svg',
  ...props
}: IconSvgProps) {
  return (
    <svg
      fill={fill}
      height={height}
      stroke={stroke}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      strokeWidth={strokeWidth}
      viewBox={viewBox}
      width={width}
      xmlns={xmlns}
      {...props}
      {...stylex.props(styles.root)}
    />
  );
}
