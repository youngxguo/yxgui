import * as stylex from '@stylexjs/stylex';

/** Global type scale, weights, and font families used by component styles. */
export const typographyTokens = stylex.defineConsts({
  fontFamily: "'Inter', sans-serif",
  fontFamilyMono:
    "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightStrong: 600,
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.8125rem',
  fontSizeMd: '0.9375rem',
  fontSizeLg: '1.0625rem',
  fontSizeXl: '1.125rem',
  fontSize2xl: '1.5rem',
  fontSize3xl: '1.875rem',
  lineHeightTight: 1,
  lineHeightSnug: 1.25,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.7,
  letterSpacingTight: '-0.02em'
});

/** Reusable corner radius scale for controls, surfaces, and pills. */
export const radiusTokens = stylex.defineConsts({
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  pill: '999px'
});

/** Primary spacing scale used for layout gaps, padding, and compact control heights. */
export const spacingTokens = stylex.defineConsts({
  xxxs: '0.125rem',
  xxs: '0.25rem',
  half: '0.5rem',
  xs: '0.4rem',
  sm: '0.45rem',
  md: '0.6rem',
  lg: '0.75rem',
  xl: '1rem',
  xxl: '1.5rem',
  xxxl: '2rem',
  xxxxl: '2.5rem',
  xxxxxl: '3rem'
});

/** Shared stacking layers for floating UI and local positioned elements. */
export const layerTokens = stylex.defineConsts({
  local: 1,
  floating: 1000
});

/** Reusable elevation shadows for controls and floating surfaces. */
export const shadowTokens = stylex.defineConsts({
  floating: '0 6px 16px rgba(0,0,0,0.22)',
  controlThumb: '0 1px 2px rgba(0,0,0,0.15)'
});
