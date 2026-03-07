import * as stylex from '@stylexjs/stylex';

/** Semantic foreground/background/border sets for button-like component variants. */
export const buttonVariantTokens = stylex.defineConsts({
  primaryBackground: '#2563eb',
  primaryForeground: '#f8fbff',
  secondaryBackground: '#ffffff',
  secondaryForeground: '#0f172a',
  secondaryBorder: '#aeb8c6',
  secondaryHoverBorder: '#7d8ca3',
  ghostForeground: '#0f172a',
  ghostHoverBackground: '#ffffff',
  outlineBorder: '#aeb8c6',
  destructiveBackground: '#e11d48',
  destructiveBorder: '#be123c',
  destructiveForeground: '#fff5f7'
});

/** Button interaction details (shadows/disabled/pressed offset) shared by button-like controls. */
export const buttonInteractionTokens = stylex.defineConsts({
  primaryShadow: 'none',
  primaryHoverShadow: 'none',
  primaryPressedShadow: 'none',
  disabledBackground: '#ffffff',
  disabledBorder: '#c2cad6',
  disabledForeground: '#667085',
  activeOffset: '1px'
});

/** Badge-specific semantic colors tuned for stronger chroma than generic status surfaces. */
export const badgeStyleTokens = stylex.defineConsts({
  neutralBackground: '#3b82f6',
  neutralForeground: '#dbeafe',
  neutralBorder: '#dbeafe',
  successBackground: '#22c55e',
  successForeground: '#dcfce7',
  successBorder: '#dcfce7',
  warningBackground: '#f59e0b',
  warningForeground: '#ffedd5',
  warningBorder: '#ffedd5',
  errorBackground: '#ef4444',
  errorForeground: '#fee2e2',
  errorBorder: '#fee2e2',
  outlineForeground: '#2563eb',
  outlineBorder: '#2563eb'
});

/** Card elevation shadows so card tuning does not affect other surface components. */
export const cardElevationTokens = stylex.defineConsts({
  shadow: 'none',
  hoverShadow: 'none'
});

/** Component-specific sizing values that are intentionally outside the core spacing scale. */
export const componentSizeTokens = stylex.defineConsts({
  sizeMd: '2rem',
  sizeLg: '2.5rem',
  switchTrackWidthSm: '1.875rem',
  switchTrackWidthMd: '2.375rem',
  switchTrackHeightSm: '1.125rem',
  switchTrackHeightMd: '1.375rem',
  menuMinWidth: '10.75rem',
  textareaMinHeightSm: '5rem',
  textareaMinHeightMd: '6rem',
  textareaMinHeightLg: '7rem',
  inputOtpSlotWidth: '2.25rem'
});
