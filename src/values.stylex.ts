import * as stylex from '@stylexjs/stylex';

export const palette = stylex.defineConsts({
  white: '#ffffff',
  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  neutral950: '#0a0a0a',
  red50: '#fef2f2',
  red300: '#fca5a5',
  red500: '#ef4444',
  red700: '#b91c1c',
  red950: '#450a0a'
});

export const fontFamilies = stylex.defineConsts({
  sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, ui-monospace, monospace'
});

export const fontSizes = stylex.defineConsts({
  body: '1rem',
  small: '0.875rem',
  heading: '1.5rem'
});

export const lineHeights = stylex.defineConsts({
  body: '1.5rem',
  small: '1.25rem',
  heading: '2rem'
});

export const fontWeights = stylex.defineConsts({
  regular: '400',
  semibold: '600',
  bold: '700'
});

export const letterSpacings = stylex.defineConsts({
  default: '0',
  heading: '-0.015em'
});

export const controlValues = stylex.defineConsts({
  height: '2.25rem',
  paddingInline: '1rem',
  gap: '0.5rem'
});

export const radiusValues = stylex.defineConsts({
  control: '0.375rem',
  container: '0.5rem',
  full: '9999px'
});
