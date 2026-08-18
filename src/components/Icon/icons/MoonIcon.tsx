import { IconSvg, type IconComponentProps } from '../IconSvg';

export function MoonIcon({ label }: IconComponentProps) {
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
      <path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6a8.5 8.5 0 1 0 11.6 11.6Z" />
    </IconSvg>
  );
}
