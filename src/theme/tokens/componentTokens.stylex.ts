import * as stylex from '@stylexjs/stylex';

/** Semantic foreground/background/border sets for button-like component variants. */
export const buttonVariantTokens = stylex.defineConsts({
  primaryBackground: '#0b5fff',
  primaryForeground: '#f8fbff',
  secondaryBackground: '#eef3ff',
  secondaryForeground: '#0f172a',
  secondaryBorder: '#c0cdee',
  secondaryHoverBorder: '#8ca2dd',
  ghostForeground: '#0f172a',
  ghostHoverBackground: '#e6eeff',
  outlineBorder: '#c0cdee',
  destructiveBackground: '#e11d48',
  destructiveBorder: '#be123c',
  destructiveForeground: '#fff5f7'
});

/** Button interaction details (shadows/disabled/pressed offset) shared by button-like controls. */
export const buttonInteractionTokens = stylex.defineConsts({
  primaryShadow: '0 1px 0 rgba(8, 27, 96, 0.28), 0 6px 14px rgba(11, 95, 255, 0.3)',
  primaryHoverShadow: '0 1px 0 rgba(8, 27, 96, 0.32), 0 10px 18px rgba(11, 95, 255, 0.36)',
  primaryPressedShadow: 'inset 0 0 0 1px rgba(8, 27, 96, 0.5), 0 1px 1px rgba(8, 27, 96, 0.35)',
  disabledBackground: '#edf2ff',
  disabledBorder: '#dce5fb',
  disabledForeground: '#667085',
  activeOffset: '1px'
});

/** Badge-specific semantic colors tuned for stronger chroma than generic status surfaces. */
export const badgeStyleTokens = stylex.defineConsts({
  neutralBackground: '#dce8ff',
  neutralForeground: '#3f67d7',
  neutralBorder: '#3f67d7',
  successBackground: '#d8f5e7',
  successForeground: '#229160',
  successBorder: '#229160',
  warningBackground: '#ffe7d1',
  warningForeground: '#c7752f',
  warningBorder: '#c7752f',
  errorBackground: '#ffdce4',
  errorForeground: '#c94c6a',
  errorBorder: '#c94c6a',
  outlineForeground: '#3f67d7',
  outlineBorder: '#3f67d7'
});

/** Card elevation shadows so card tuning does not affect other surface components. */
export const cardElevationTokens = stylex.defineConsts({
  shadow: '0 1px 2px rgba(36, 73, 153, 0.16), 0 6px 16px rgba(36, 73, 153, 0.1)',
  hoverShadow: '0 6px 18px rgba(36, 73, 153, 0.2), 0 2px 6px rgba(36, 73, 153, 0.14)'
});
