import { IconSvg, type IconComponentProps } from '../IconSvg';

export function MailIcon({ label }: IconComponentProps) {
  return (
    <IconSvg
      fill="none"
      height="24"
      label={label}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
    >
      <rect height="14" rx="2" width="18" x="3" y="5" />
      <path d="m3 7 9 6 9-6" />
    </IconSvg>
  );
}
