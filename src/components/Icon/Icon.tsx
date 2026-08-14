import * as stylex from '@stylexjs/stylex';
import githubLogo from './assets/github.svg';
import linkedinLogo from './assets/linkedin.png';

type BrandIconProps = {
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

export function GitHubIcon({ label }: BrandIconProps) {
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

export function LinkedInIcon({ label }: BrandIconProps) {
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
