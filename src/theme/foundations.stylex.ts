import * as stylex from '@stylexjs/stylex';

export const spacing = stylex.defineConsts({
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px'
});

export const radii = stylex.defineConsts({
  sm: '4px',
  md: '6px',
  full: '9999px'
});

export const fontFamilies = stylex.defineConsts({
  sans: 'Inter Variable, sans-serif'
});

export const fontSizes = stylex.defineConsts({
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '24px',
  xl: '32px'
});

export const fontWeights = stylex.defineConsts({
  regular: 400,
  semibold: 600
});

export const lineHeights = stylex.defineConsts({
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '40px'
});
