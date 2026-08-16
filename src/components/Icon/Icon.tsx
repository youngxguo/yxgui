import * as stylex from '@stylexjs/stylex';

export type IconProps = {
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
    <svg
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      fill="currentColor"
      focusable="false"
      height="96"
      role={label === undefined ? undefined : 'img'}
      viewBox="0 0 98 96"
      width="98"
      {...stylex.props(styles.root)}
    >
      <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252V91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008V83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" />
    </svg>
  );
}

export function LinkedInIcon({ label }: IconProps) {
  return (
    <svg
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      fill="currentColor"
      focusable="false"
      height="24"
      role={label === undefined ? undefined : 'img'}
      viewBox="0 0 24 24"
      width="24"
      {...stylex.props(styles.root)}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
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
