import * as stylex from '@stylexjs/stylex';

export const paletteTokens = stylex.defineConsts({
  background: '#fcfcf9',
  foreground: '#161614',
  border: '#cfcec5',
  accent: '#2855f2',
  focusRing: '#2855f2',
  mutedForeground: '#59594f'
});

export const typographyTokens = stylex.defineConsts({
  fontFamily: "'IBM Plex Sans', 'Avenir Next', 'Segoe UI', sans-serif",
  fontWeightStrong: 600,
  fontSizeSm: '0.8125rem',
  fontSizeMd: '0.9375rem',
  fontSizeLg: '1.0625rem',
  lineHeightTight: 1
});

export const radiusTokens = stylex.defineConsts({
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  pill: '999px'
});

export const spacingTokens = stylex.defineConsts({
  xs: '0.4rem',
  sm: '0.45rem',
  md: '0.6rem',
  lg: '0.75rem'
});

export const surfaceTokens = stylex.defineConsts({
  base: '#fcfcf9',
  elevated: '#ffffff',
  subtle: '#f4f4ef'
});

export const borderTokens = stylex.defineConsts({
  default: '#cfcec5',
  muted: '#e3e1d7',
  strong: '#aead9f',
  focus: '#2855f2'
});

export const controlTokens = stylex.defineConsts({
  background: '#ffffff',
  backgroundDisabled: '#f4f4ef',
  foreground: '#161614',
  placeholder: '#76766b',
  border: '#cfcec5',
  borderFocus: '#2855f2'
});

export const variantTokens = stylex.defineConsts({
  primaryBackground: '#161614',
  primaryForeground: '#fcfcf9',
  secondaryBackground: '#fcfcf9',
  secondaryForeground: '#161614',
  secondaryBorder: '#cfcec5',
  secondaryHoverBorder: '#bcbab0',
  ghostForeground: '#161614',
  ghostHoverBackground: 'rgba(22, 22, 20, 0.06)',
  outlineBorder: '#cfcec5',
  outlineForeground: '#161614'
});

export const buttonTokens = stylex.defineConsts({
  primaryHoverShadow: '0 6px 16px rgba(22, 22, 20, 0.18)',
  disabledOpacity: 0.55,
  activeOffset: '1px',
  paddingSm: '0.375rem 0.75rem',
  paddingMd: '0.45rem 0.875rem',
  paddingLg: '0.55rem 1rem',
  minHeightSm: '2rem',
  minHeightMd: '2.25rem',
  minHeightLg: '2.5rem'
});

export const inputTokens = stylex.defineConsts({
  invalidBorder: '#c43d3d'
});

export const cardTokens = stylex.defineConsts({
  shadow: '0 8px 24px rgba(22, 22, 20, 0.06)'
});
