import * as stylex from '@stylexjs/stylex';

/** Semantic foreground/background/border sets for button-like component variants. */
export const buttonVariantTokens = stylex.defineConsts({
  primaryBackground: '#161614',
  primaryForeground: '#fcfcf9',
  secondaryBackground: '#fcfcf9',
  secondaryForeground: '#161614',
  secondaryBorder: '#cfcec5',
  secondaryHoverBorder: '#bcbab0',
  ghostForeground: '#161614',
  ghostHoverBackground: '#f0f0eb',
  outlineBorder: '#cfcec5',
  destructiveBackground: '#dc2626',
  destructiveBorder: '#b91c1c',
  destructiveForeground: '#fff5f5'
});

/** Button interaction details (shadows/disabled/pressed offset) shared by button-like controls. */
export const buttonInteractionTokens = stylex.defineConsts({
  primaryShadow: '0 1px 2px #d9d7cc, 0 1px 1px #ebeae1',
  primaryHoverShadow: '0 2px 4px #d3d1c4, 0 1px 2px #e4e2d7',
  primaryPressedShadow: 'inset 0 0 0 1px #4c4b45, 0 1px 1px #11110f',
  disabledBackground: '#f4f4ef',
  disabledBorder: '#e3e1d7',
  disabledForeground: '#76766b',
  activeOffset: '1px'
});

/** Neutral and semantic badge defaults until badge variants get their own recipe layer. */
export const badgeStyleTokens = stylex.defineConsts({
  neutralBackground: '#ebe9df',
  neutralForeground: '#3f3d36',
  neutralBorder: '#d2cfbf'
});

/** Card elevation shadows so card tuning does not affect other surface components. */
export const cardElevationTokens = stylex.defineConsts({
  shadow: '0 1px 2px #e7e5db, 0 1px 1px #f0efe8',
  hoverShadow: '0 3px 8px #dfddd1, 0 1px 2px #eceadf'
});
