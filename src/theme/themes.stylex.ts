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

const darkPalette = {
  accent: '#7fb5ff',
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

const darkBadgeTones = {
  error: { background: '#9b2f2f', border: '#d77979', foreground: '#ffeaea' },
  neutral: { background: '#29538f', border: '#5f92cf', foreground: '#e8f1ff' },
  success: { background: '#1f6a3a', border: '#5cb784', foreground: '#e7f9ee' },
  warning: { background: '#8e541b', border: '#d8a05b', foreground: '#fff1dc' }
} as const;

const darkColorTheme = stylex.createTheme(colorTokens, {
  background: darkPalette.background,
  foreground: darkPalette.foreground,
  accent: darkPalette.accent,
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
  primaryBackground: darkPalette.accent,
  primaryForeground: '#0f172a',
  secondaryBackground: darkPalette.surfaceSubtle,
  secondaryForeground: darkPalette.foreground,
  secondaryBorder: darkPalette.borderMuted,
  secondaryHoverBorder: darkPalette.borderStrong,
  ghostForeground: darkPalette.foreground,
  ghostHoverBackground: darkPalette.surfaceSubtle,
  outlineBorder: darkPalette.borderMuted,
  destructiveBackground: '#c61e4e',
  destructiveBorder: '#ad1a43',
  destructiveForeground: '#fff1f2'
});

const darkButtonInteractionTheme = stylex.createTheme(buttonInteractionTokens, {
  primaryShadow: 'none',
  primaryHoverShadow: 'none',
  primaryPressedShadow: 'none',
  disabledBackground: darkPalette.controlDisabled,
  disabledBorder: darkPalette.borderMuted,
  disabledForeground: darkPalette.mutedForeground,
  activeOffset: '1px'
});

const darkBadgeStyleTheme = stylex.createTheme(badgeStyleTokens, {
  neutralBackground: darkBadgeTones.neutral.background,
  neutralForeground: darkBadgeTones.neutral.foreground,
  neutralBorder: darkBadgeTones.neutral.border,
  successBackground: darkBadgeTones.success.background,
  successForeground: darkBadgeTones.success.foreground,
  successBorder: darkBadgeTones.success.border,
  warningBackground: darkBadgeTones.warning.background,
  warningForeground: darkBadgeTones.warning.foreground,
  warningBorder: darkBadgeTones.warning.border,
  errorBackground: darkBadgeTones.error.background,
  errorForeground: darkBadgeTones.error.foreground,
  errorBorder: darkBadgeTones.error.border,
  outlineForeground: '#b8d4ff',
  outlineBorder: darkPalette.accent
});

const darkThemes = [
  darkColorTheme,
  darkSurfaceTheme,
  darkOverlayTheme,
  darkBorderTheme,
  darkControlTheme,
  darkStatusTheme,
  darkValidationTheme,
  darkButtonVariantTheme,
  darkButtonInteractionTheme,
  darkBadgeStyleTheme
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
