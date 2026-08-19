import { IconSvg, type IconSvgProps } from '../IconSvg';

export function SunIcon(props: IconSvgProps) {
  return (
    <IconSvg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </IconSvg>
  );
}
