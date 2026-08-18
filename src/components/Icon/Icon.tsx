import { iconRegistry, type IconName } from './icons';

type IconProps = {
  label?: string;
  name: IconName;
};

export function Icon({ label, name }: IconProps) {
  const SvgIcon = iconRegistry[name];

  return <SvgIcon label={label} />;
}
