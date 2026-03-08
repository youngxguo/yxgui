import * as stylex from '@stylexjs/stylex';
import { buttonVariantTokens } from './tokens/componentTokens.stylex';
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

const darkPalette = {
  accent: '#7fb5ff',
  accentForeground: '#0f172a',
  background: '#202020',
  border: '#565656',
  borderMuted: '#6d6d6d',
  borderStrong: '#868686',
  controlBackground: '#2a2a2a',
  controlDisabled: '#343434',
  controlBorder: '#6d6d6d',
  foreground: '#f7f7f7',
  inset: '#1a1a1a',
  mutedForeground: '#c0c0c0',
  surfaceElevated: '#2a2a2a',
  surfaceHover: '#404040',
  surfaceStrong: '#575757',
  surfaceSubtle: '#343434'
} as const;

const darkStatusTones = {
  error: { background: '#7d3232', border: '#d07a7a', foreground: '#ffe8e8' },
  info: { background: '#2a4d7d', border: '#5f92cf', foreground: '#e8f1ff' },
  success: { background: '#245a37', border: '#58b77e', foreground: '#e6f8ed' },
  warning: { background: '#7a5127', border: '#d79a57', foreground: '#fff0db' }
} as const;

const darkColorTheme = stylex.createTheme(colorTokens, {
  background: darkPalette.background,
  foreground: darkPalette.foreground,
  accent: darkPalette.accent,
  accentForeground: darkPalette.accentForeground,
  mutedForeground: darkPalette.mutedForeground
});

const darkSurfaceTheme = stylex.createTheme(surfaceTokens, {
  base: darkPalette.background,
  elevated: darkPalette.surfaceElevated,
  subtle: darkPalette.surfaceSubtle,
  selected: darkPalette.surfaceSubtle,
  soft: darkPalette.surfaceSubtle,
  softHover: darkPalette.surfaceHover,
  softStrong: darkPalette.surfaceStrong,
  inset: darkPalette.inset,
  accentMuted: darkPalette.surfaceSubtle,
  hover: darkPalette.surfaceSubtle,
  accentSubtle: darkPalette.surfaceSubtle
});

const darkOverlayTheme = stylex.createTheme(overlayTokens, {
  scrim: 'rgba(0, 0, 0, 0.6)'
});

const darkBorderTheme = stylex.createTheme(borderTokens, {
  widthThin: '1px',
  default: darkPalette.border,
  muted: darkPalette.borderMuted,
  strong: darkPalette.borderStrong,
  focus: darkPalette.accent
});

const darkControlTheme = stylex.createTheme(controlTokens, {
  background: darkPalette.controlBackground,
  backgroundDisabled: darkPalette.controlDisabled,
  foreground: darkPalette.foreground,
  placeholder: darkPalette.mutedForeground,
  border: darkPalette.controlBorder,
  borderFocus: darkPalette.accent
});

const darkStatusTheme = stylex.createTheme(statusTokens, {
  infoBackground: darkStatusTones.info.background,
  infoBorder: darkStatusTones.info.border,
  infoForeground: darkStatusTones.info.foreground,
  successBackground: darkStatusTones.success.background,
  successBorder: darkStatusTones.success.border,
  successForeground: darkStatusTones.success.foreground,
  warningBackground: darkStatusTones.warning.background,
  warningBorder: darkStatusTones.warning.border,
  warningForeground: darkStatusTones.warning.foreground,
  errorBackground: darkStatusTones.error.background,
  errorBorder: darkStatusTones.error.border,
  errorForeground: darkStatusTones.error.foreground
});

const darkValidationTheme = stylex.createTheme(validationTokens, {
  invalidBorder: '#f87171',
  invalidForeground: '#fecaca'
});

const darkButtonVariantTheme = stylex.createTheme(buttonVariantTokens, {
  destructiveBackground: '#c61e4e',
  destructiveBorder: '#ad1a43',
  destructiveForeground: '#fff1f2'
});

const darkThemes = [
  darkColorTheme,
  darkSurfaceTheme,
  darkOverlayTheme,
  darkBorderTheme,
  darkControlTheme,
  darkStatusTheme,
  darkValidationTheme,
  darkButtonVariantTheme
] as const;

const themeRootStyles = stylex.create({
  root: {
    backgroundColor: colorTokens.background,
    color: colorTokens.foreground
  }
});

export function getThemeStyleProps(theme: ThemeName = 'light') {
  return theme === 'dark' ? stylex.props(...darkThemes) : stylex.props();
}

export function getThemeRootStyleProps(theme: ThemeName = 'light') {
  const resolvedThemeStyles = theme === 'dark' ? [...darkThemes] : [];

  return stylex.props(...resolvedThemeStyles, themeRootStyles.root);
}
