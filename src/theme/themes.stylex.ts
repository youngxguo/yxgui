import * as stylex from '@stylexjs/stylex';
import {
  badgeStyleTokens,
  buttonInteractionTokens,
  buttonVariantTokens
} from './tokens/componentTokens.stylex';
import {
  borderTokens,
  colorTokens,
  controlTokens,
  overlayTokens,
  statusTokens,
  surfaceTokens,
  validationTokens
} from './tokens/semanticTokens.stylex';

export type ThemeName = 'light' | 'dark';

const darkColorTheme = stylex.createTheme(colorTokens, {
  background: '#111113',
  foreground: '#f4f4f5',
  accent: '#60a5fa',
  mutedForeground: '#a1a1aa'
});

const darkSurfaceTheme = stylex.createTheme(surfaceTokens, {
  base: '#111113',
  elevated: '#1a1a1d',
  subtle: '#27272a',
  selected: '#27272a',
  soft: '#27272a',
  softHover: '#3f3f46',
  softStrong: '#52525b',
  inset: '#101012',
  accentMuted: '#27272a',
  hover: '#27272a',
  accentSubtle: '#27272a'
});

const darkOverlayTheme = stylex.createTheme(overlayTokens, {
  scrim: 'rgba(0, 0, 0, 0.72)'
});

const darkBorderTheme = stylex.createTheme(borderTokens, {
  widthThin: '1px',
  default: '#3f3f46',
  muted: '#52525b',
  strong: '#71717a',
  focus: '#60a5fa'
});

const darkControlTheme = stylex.createTheme(controlTokens, {
  background: '#1a1a1d',
  backgroundDisabled: '#27272a',
  foreground: '#f4f4f5',
  placeholder: '#a1a1aa',
  border: '#52525b',
  borderFocus: '#60a5fa'
});

const darkStatusTheme = stylex.createTheme(statusTokens, {
  infoBackground: '#1e3a8a',
  infoBorder: '#60a5fa',
  infoForeground: '#dbeafe',
  successBackground: '#14532d',
  successBorder: '#4ade80',
  successForeground: '#dcfce7',
  warningBackground: '#78350f',
  warningBorder: '#fbbf24',
  warningForeground: '#fef3c7',
  errorBackground: '#7f1d1d',
  errorBorder: '#f87171',
  errorForeground: '#fee2e2'
});

const darkValidationTheme = stylex.createTheme(validationTokens, {
  invalidBorder: '#f87171',
  invalidForeground: '#fecaca'
});

const darkButtonVariantTheme = stylex.createTheme(buttonVariantTokens, {
  primaryBackground: '#3b82f6',
  primaryForeground: '#eff6ff',
  secondaryBackground: '#27272a',
  secondaryForeground: '#f4f4f5',
  secondaryBorder: '#52525b',
  secondaryHoverBorder: '#71717a',
  ghostForeground: '#f4f4f5',
  ghostHoverBackground: '#27272a',
  outlineBorder: '#52525b',
  destructiveBackground: '#be123c',
  destructiveBorder: '#9f1239',
  destructiveForeground: '#fff1f2'
});

const darkButtonInteractionTheme = stylex.createTheme(buttonInteractionTokens, {
  primaryShadow: 'none',
  primaryHoverShadow: 'none',
  primaryPressedShadow: 'none',
  disabledBackground: '#27272a',
  disabledBorder: '#52525b',
  disabledForeground: '#a1a1aa',
  activeOffset: '1px'
});

const darkBadgeStyleTheme = stylex.createTheme(badgeStyleTokens, {
  neutralBackground: '#1d4ed8',
  neutralForeground: '#dbeafe',
  neutralBorder: '#60a5fa',
  successBackground: '#15803d',
  successForeground: '#dcfce7',
  successBorder: '#4ade80',
  warningBackground: '#b45309',
  warningForeground: '#ffedd5',
  warningBorder: '#fbbf24',
  errorBackground: '#b91c1c',
  errorForeground: '#fee2e2',
  errorBorder: '#f87171',
  outlineForeground: '#93c5fd',
  outlineBorder: '#60a5fa'
});

export function getThemeStyleProps(theme: ThemeName = 'light') {
  const isDark = theme === 'dark';

  return stylex.props(
    isDark && darkColorTheme,
    isDark && darkSurfaceTheme,
    isDark && darkOverlayTheme,
    isDark && darkBorderTheme,
    isDark && darkControlTheme,
    isDark && darkStatusTheme,
    isDark && darkValidationTheme,
    isDark && darkButtonVariantTheme,
    isDark && darkButtonInteractionTheme,
    isDark && darkBadgeStyleTheme
  );
}
