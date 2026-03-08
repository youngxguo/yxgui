import * as stylex from '@stylexjs/stylex';
import {
  borderTokens,
  colorTokens,
  controlTokens,
  statusTokens,
  surfaceTokens
} from './semanticTokens.stylex';

/** Semantic foreground/background/border sets for button-like component variants. */
export const buttonVariantTokens = stylex.defineVars({
  primaryBackground: colorTokens.accent,
  primaryForeground: colorTokens.accentForeground,
  secondaryBackground: surfaceTokens.subtle,
  secondaryForeground: colorTokens.foreground,
  secondaryBorder: borderTokens.default,
  secondaryHoverBorder: borderTokens.strong,
  ghostForeground: colorTokens.foreground,
  ghostHoverBackground: surfaceTokens.hover,
  outlineBorder: borderTokens.default,
  destructiveBackground: '#e11d48',
  destructiveBorder: '#be123c',
  destructiveForeground: '#fff5f7'
});

/** Button interaction details (shadows/disabled/pressed offset) shared by button-like controls. */
export const buttonInteractionTokens = stylex.defineVars({
  primaryShadow: 'none',
  primaryHoverShadow: 'none',
  primaryPressedShadow: 'none',
  disabledBackground: controlTokens.backgroundDisabled,
  disabledBorder: borderTokens.muted,
  disabledForeground: colorTokens.mutedForeground,
  activeOffset: '1px'
});

/** Badge-specific semantic colors tuned for stronger chroma than generic status surfaces. */
export const badgeStyleTokens = stylex.defineVars({
  neutralBackground: colorTokens.accent,
  neutralForeground: colorTokens.accentForeground,
  neutralBorder: colorTokens.accent,
  successBackground: statusTokens.successBackground,
  successForeground: statusTokens.successForeground,
  successBorder: statusTokens.successBorder,
  warningBackground: statusTokens.warningBackground,
  warningForeground: statusTokens.warningForeground,
  warningBorder: statusTokens.warningBorder,
  errorBackground: statusTokens.errorBackground,
  errorForeground: statusTokens.errorForeground,
  errorBorder: statusTokens.errorBorder,
  outlineForeground: colorTokens.accent,
  outlineBorder: colorTokens.accent
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
