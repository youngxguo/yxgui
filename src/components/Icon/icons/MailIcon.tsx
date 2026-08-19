import { IconSvg, type IconSvgProps } from '../IconSvg';

export function MailIcon(props: IconSvgProps) {
  return (
    <IconSvg {...props}>
      <rect height="14" rx="2" width="18" x="3" y="5" />
      <path d="m3 7 9 6 9-6" />
    </IconSvg>
  );
}
