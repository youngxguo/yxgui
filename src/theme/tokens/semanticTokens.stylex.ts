import * as stylex from '@stylexjs/stylex';

/** Core semantic colors used across text, accents, and neutral UI ink. */
export const colorTokens = stylex.defineConsts({
  background: '#f6f8ff',
  foreground: '#111827',
  accent: '#0b5fff',
  mutedForeground: '#4b5563'
});

/** Surface colors for layered containers, hover states, and subtle emphasis. */
export const surfaceTokens = stylex.defineConsts({
  base: '#f6f8ff',
  elevated: '#ffffff',
  subtle: '#edf2ff',
  selected: '#e7eeff',
  soft: '#dfe8ff',
  softHover: '#d5e1ff',
  softStrong: '#9db3f9',
  inset: '#c7d4f7',
  accentMuted: '#dbe7ff',
  hover: '#e7eeff',
  accentSubtle: '#edf3ff'
});

/** Overlay/scrim colors used behind modal surfaces. */
export const overlayTokens = stylex.defineConsts({
  scrim: 'rgba(10, 23, 58, 0.5)'
});

/** Border widths plus neutral/focus border colors shared across components. */
export const borderTokens = stylex.defineConsts({
  widthThin: '1px',
  default: '#c0cdee',
  muted: '#dce5fb',
  strong: '#8ca2dd',
  focus: '#0b5fff'
});

/** Default form-control colors, including disabled and focus-border states. */
export const controlTokens = stylex.defineConsts({
  background: '#ffffff',
  backgroundDisabled: '#edf2ff',
  foreground: '#111827',
  placeholder: '#667085',
  border: '#c0cdee',
  borderFocus: '#0b5fff'
});

/** Status color sets used by alert-like feedback components. */
export const statusTokens = stylex.defineConsts({
  infoBackground: '#dbeafe',
  infoBorder: '#3b82f6',
  infoForeground: '#1d4ed8',
  successBackground: '#dcfce7',
  successBorder: '#22c55e',
  successForeground: '#166534',
  warningBackground: '#fef3c7',
  warningBorder: '#f59e0b',
  warningForeground: '#92400e',
  errorBackground: '#fee2e2',
  errorBorder: '#ef4444',
  errorForeground: '#b91c1c'
});

/** Form validation accents shared across control and field messaging styles. */
export const validationTokens = stylex.defineConsts({
  invalidBorder: '#dc2626',
  invalidForeground: '#b42318'
});
