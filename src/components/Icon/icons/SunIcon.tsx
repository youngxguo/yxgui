import { IconSvg, type IconComponentProps } from '../IconSvg';

export function SunIcon(props: IconComponentProps) {
  return (
    <IconSvg {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M11 1h2v4h-2zM11 19h2v4h-2zM19 11h4v2h-4zM1 11h4v2H1zM18.36 4.22l1.42 1.42-2.83 2.83-1.42-1.42zM5.64 15.53l1.42 1.42-2.83 2.83-1.42-1.42zM19.78 18.36l-1.42 1.42-2.83-2.83 1.42-1.42zM8.47 7.05 7.05 8.47 4.22 5.64l1.42-1.42z" />
    </IconSvg>
  );
}
