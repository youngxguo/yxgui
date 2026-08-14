import * as stylex from '@stylexjs/stylex';
import githubLogo from './assets/github.svg';
import linkedinLogo from './assets/linkedin.png';

type IconProps = {
  label?: string;
};

const styles = stylex.create({
  root: {
    display: 'block',
    flexShrink: 0,
    height: '24px',
    objectFit: 'contain',
    width: 'auto'
  }
});

export function GitHubIcon({ label }: IconProps) {
  return (
    <img
      alt={label ?? ''}
      draggable={false}
      height={96}
      src={githubLogo}
      width={98}
      {...stylex.props(styles.root)}
    />
  );
}

export function LinkedInIcon({ label }: IconProps) {
  return (
    <img
      alt={label ?? ''}
      draggable={false}
      height={779}
      src={linkedinLogo}
      width={840}
      {...stylex.props(styles.root)}
    />
  );
}

export function MailIcon({ label }: IconProps) {
  return (
    <svg
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      fill="none"
      focusable="false"
      height="24"
      role={label === undefined ? undefined : 'img'}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      {...stylex.props(styles.root)}
    >
      <rect height="14" rx="2" width="18" x="3" y="5" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function SunIcon({ label }: IconProps) {
  return (
    <svg
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      fill="none"
      focusable="false"
      height="24"
      role={label === undefined ? undefined : 'img'}
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      {...stylex.props(styles.root)}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

export function MoonIcon({ label }: IconProps) {
  return (
    <svg
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      fill="none"
      focusable="false"
      height="24"
      role={label === undefined ? undefined : 'img'}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      {...stylex.props(styles.root)}
    >
      <path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6a8.5 8.5 0 1 0 11.6 11.6Z" />
    </svg>
  );
}
