import * as stylex from '@stylexjs/stylex';

/** Core semantic colors used across text, accents, and neutral UI ink. */
export const colorTokens = stylex.defineConsts({
  background: '#fcfcf9',
  foreground: '#161614',
  accent: '#2855f2',
  mutedForeground: '#59594f'
});

/** Surface colors for layered containers, hover states, and subtle emphasis. */
export const surfaceTokens = stylex.defineConsts({
  base: '#fcfcf9',
  elevated: '#ffffff',
  subtle: '#f4f4ef',
  selected: '#fafaf5',
  soft: '#ecebe4',
  softHover: '#efeee7',
  softStrong: '#c9c7bc',
  inset: '#d9d8cf',
  accentMuted: '#e9eefc',
  hover: '#f1efe6',
  accentSubtle: '#eaf0ff'
});

/** Overlay/scrim colors used behind modal surfaces. */
export const overlayTokens = stylex.defineConsts({
  scrim: 'rgba(14, 14, 12, 0.45)'
});

/** Border widths plus neutral/focus border colors shared across components. */
export const borderTokens = stylex.defineConsts({
  widthThin: '1px',
  default: '#cfcec5',
  muted: '#e3e1d7',
  strong: '#aead9f',
  focus: '#2855f2'
});

/** Default form-control colors, including disabled and focus-border states. */
export const controlTokens = stylex.defineConsts({
  background: '#ffffff',
  backgroundDisabled: '#f4f4ef',
  foreground: '#161614',
  placeholder: '#76766b',
  border: '#cfcec5',
  borderFocus: '#2855f2'
});

/** Status color sets used by alert-like feedback components. */
export const statusTokens = stylex.defineConsts({
  infoBackground: '#dbeafe',
  infoBorder: '#60a5fa',
  infoForeground: '#1d4ed8',
  successBackground: '#dcfce7',
  successBorder: '#4ade80',
  successForeground: '#166534',
  warningBackground: '#fef3c7',
  warningBorder: '#f59e0b',
  warningForeground: '#92400e',
  errorBackground: '#fee2e2',
  errorBorder: '#f87171',
  errorForeground: '#991b1b'
});

/** Form validation accents shared across control and field messaging styles. */
export const validationTokens = stylex.defineConsts({
  invalidBorder: '#c43d3d',
  invalidForeground: '#b42318'
});
