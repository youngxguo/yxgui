import * as stylex from '@stylexjs/stylex';

/** Base palette values used directly by shared recipes and semantic token groups. */
export const paletteTokens = stylex.defineConsts({
  background: '#fcfcf9',
  foreground: '#161614',
  border: '#cfcec5',
  accent: '#2855f2',
  focusRing: '#2855f2',
  mutedForeground: '#59594f'
});

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

/** Shared stacking layers for floating UI and local positioned elements. */
export const layerTokens = stylex.defineConsts({
  local: 1,
  floating: 1000
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

/** Semantic foreground/background/border sets for button-like component variants. */
export const variantTokens = stylex.defineConsts({
  primaryBackground: '#161614',
  primaryForeground: '#fcfcf9',
  secondaryBackground: '#fcfcf9',
  secondaryForeground: '#161614',
  secondaryBorder: '#cfcec5',
  secondaryHoverBorder: '#bcbab0',
  ghostForeground: '#161614',
  ghostHoverBackground: '#f0f0eb',
  outlineBorder: '#cfcec5',
  outlineForeground: '#161614',
  destructiveBackground: '#dc2626',
  destructiveBorder: '#b91c1c',
  destructiveForeground: '#fff5f5'
});

/** Button interaction details (shadows/pressed offset) kept separate from shared variants. */
export const buttonTokens = stylex.defineConsts({
  primaryShadow: '0 1px 2px #d9d7cc, 0 1px 1px #ebeae1',
  primaryHoverShadow: '0 2px 4px #d3d1c4, 0 1px 2px #e4e2d7',
  primaryPressedShadow: 'inset 0 0 0 1px #4c4b45, 0 1px 1px #11110f',
  disabledBackground: '#f4f4ef',
  disabledBorder: '#e3e1d7',
  disabledForeground: '#76766b',
  activeOffset: '1px'
});

/** Reusable elevation shadows for controls and floating surfaces. */
export const shadowTokens = stylex.defineConsts({
  floating: '0 6px 16px rgba(0,0,0,0.22)',
  controlThumb: '0 1px 2px rgba(0,0,0,0.15)'
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

/** Neutral badge defaults kept separate until more badge variants need tokenization. */
export const badgeTokens = stylex.defineConsts({
  neutralBackground: '#ebe9df',
  neutralForeground: '#3f3d36',
  neutralBorder: '#d2cfbf'
});

/** Form validation accents that are intentionally narrower than `statusTokens`. */
export const inputTokens = stylex.defineConsts({
  invalidBorder: '#c43d3d',
  invalidForeground: '#b42318'
});

/** Card elevation shadows so card tuning does not affect other surface components. */
export const cardTokens = stylex.defineConsts({
  shadow: '0 1px 2px #e7e5db, 0 1px 1px #f0efe8',
  hoverShadow: '0 3px 8px #dfddd1, 0 1px 2px #eceadf'
});
