import * as stylex from '@stylexjs/stylex';

/** Compact spacing scale shared by layout and components. */
export const spacing = stylex.defineConsts({
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px'
});

export const radii = stylex.defineConsts({
  sm: '4px',
  md: '6px'
});

export const fontFamilies = stylex.defineConsts({
  sans: 'Inter Variable, sans-serif'
});

export const fontSizes = stylex.defineConsts({
  sm: '13px',
  md: '15px',
  lg: '24px',
  xl: '30px'
});

export const fontWeights = stylex.defineConsts({
  regular: 400,
  medium: 500,
  semibold: 600
});

export const lineHeights = stylex.defineConsts({
  sm: '20px',
  md: '24px',
  lg: '30px',
  xl: '38px'
});
