import { iconRegistry, type IconName } from './icons';
import type { IconComponentProps } from './IconSvg';

type IconProps = IconComponentProps & {
  name: IconName;
};

export function Icon({ color, label, name }: IconProps) {
  const SvgIcon = iconRegistry[name];

  return <SvgIcon color={color} label={label} />;
}
