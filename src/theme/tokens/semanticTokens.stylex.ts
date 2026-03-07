import * as stylex from '@stylexjs/stylex';

/** Core semantic colors used across text, accents, and neutral UI ink. */
export const colorTokens = stylex.defineConsts({
  background: '#ffffff',
  foreground: '#111827',
  accent: '#2563eb',
  mutedForeground: '#4b5563'
});

/** Surface colors for layered containers, hover states, and subtle emphasis. */
export const surfaceTokens = stylex.defineConsts({
  base: '#ffffff',
  elevated: '#ffffff',
  subtle: '#ffffff',
  selected: '#ffffff',
  soft: '#ffffff',
  softHover: '#ffffff',
  softStrong: '#919db0',
  inset: '#ffffff',
  accentMuted: '#ffffff',
  hover: '#ffffff',
  accentSubtle: '#ffffff'
});

/** Overlay/scrim colors used behind modal surfaces. */
export const overlayTokens = stylex.defineConsts({
  scrim: 'rgba(17, 24, 39, 0.5)'
});

/** Border widths plus neutral/focus border colors shared across components. */
export const borderTokens = stylex.defineConsts({
  widthThin: '1px',
  default: '#aeb8c6',
  muted: '#c2cad6',
  strong: '#7d8ca3',
  focus: '#2563eb'
});

/** Default form-control colors, including disabled and focus-border states. */
export const controlTokens = stylex.defineConsts({
  background: '#ffffff',
  backgroundDisabled: '#ffffff',
  foreground: '#111827',
  placeholder: '#667085',
  border: '#aeb8c6',
  borderFocus: '#2563eb'
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
