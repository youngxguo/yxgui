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

export const radiusTokens = stylex.defineConsts({
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  pill: '999px'
});

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

export const surfaceTokens = stylex.defineConsts({
  base: '#fcfcf9',
  elevated: '#ffffff',
  subtle: '#f4f4ef',
  soft: '#ecebe4',
  softHover: '#efeee7',
  softStrong: '#c9c7bc',
  inset: '#d9d8cf',
  accentMuted: '#e9eefc',
  hover: '#f1efe6',
  accentSubtle: '#eaf0ff'
});

export const borderTokens = stylex.defineConsts({
  widthThin: '1px',
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
  ghostHoverBackground: '#f0f0eb',
  outlineBorder: '#cfcec5',
  outlineForeground: '#161614',
  destructiveBackground: '#dc2626',
  destructiveBorder: '#b91c1c',
  destructiveForeground: '#fff5f5'
});

export const buttonTokens = stylex.defineConsts({
  primaryShadow: '0 1px 2px #d9d7cc, 0 1px 1px #ebeae1',
  primaryHoverShadow: '0 2px 4px #d3d1c4, 0 1px 2px #e4e2d7',
  disabledBackground: '#f4f4ef',
  disabledBorder: '#e3e1d7',
  disabledForeground: '#76766b',
  activeOffset: '1px'
});

export const badgeTokens = stylex.defineConsts({
  neutralBackground: '#f3f2ec',
  neutralForeground: '#4e4d45',
  neutralBorder: '#e4e2d7',
  successBackground: '#ebf8f0',
  successForeground: '#166534',
  successBorder: '#b8e3c7',
  warningBackground: '#fff5dc',
  warningForeground: '#b45309',
  warningBorder: '#f0d08a',
  errorBackground: '#fef0f0',
  errorForeground: '#b42318',
  errorBorder: '#f4b6b3'
});

export const inputTokens = stylex.defineConsts({
  invalidBorder: '#c43d3d'
});

export const cardTokens = stylex.defineConsts({
  shadow: '0 1px 2px #e7e5db, 0 1px 1px #f0efe8',
  hoverShadow: '0 3px 8px #dfddd1, 0 1px 2px #eceadf'
});

export const alertTokens = stylex.defineConsts({
  infoBackground: '#eef3ff',
  infoBorder: '#b8c7ff',
  successBackground: '#eefbf3',
  successBorder: '#8fd4ab',
  warningBackground: '#fff7e8',
  warningBorder: '#f2ca7a',
  errorBackground: '#fff0f0',
  errorBorder: '#efb3b3'
});
