import type { ComponentProps } from 'react';
import { iconRegistry, type IconName } from './icons';

type IconProps = Pick<ComponentProps<'svg'>, 'color'> & {
  label?: string;
  name: IconName;
};

export function Icon({ color, label, name }: IconProps) {
  const SvgIcon = iconRegistry[name];

  return (
    <SvgIcon
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      color={color}
      focusable="false"
      role={label === undefined ? undefined : 'img'}
    />
  );
}
