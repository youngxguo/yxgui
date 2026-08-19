import type { ComponentType } from 'react';
import type { IconComponentProps } from '../IconSvg';
import { GitHubIcon } from './GitHubIcon';
import { LinkedInIcon } from './LinkedInIcon';
import { MailIcon } from './MailIcon';
import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';

export const iconRegistry = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
  moon: MoonIcon,
  sun: SunIcon
} satisfies Record<string, ComponentType<IconComponentProps>>;

export type IconName = keyof typeof iconRegistry;
