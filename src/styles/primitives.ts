import * as stylex from '@stylexjs/stylex';
import {
  borderTokens,
  controlTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens
} from '../theme/tokens.stylex';

/**
 * Reusable low-level StyleX primitives shared across component style recipes.
 */
const focusVisibleOutline = {
  ':focus-visible': {
    outlineColor: borderTokens.focus,
    outlineOffset: spacingTokens.xxxs,
    outlineStyle: 'solid',
    outlineWidth: spacingTokens.xxxs
  }
} as const;

const interactiveTransition = {
  transitionDuration: '120ms',
  transitionProperty: 'transform, box-shadow, background-color, border-color, color',
  transitionTimingFunction: 'ease'
} as const;

const disabledCursor = {
  ':disabled': {
    cursor: 'not-allowed'
  }
} as const;

const controlBase = {
  appearance: 'none',
  backgroundColor: controlTokens.background,
  borderColor: controlTokens.border,
  borderRadius: radiusTokens.md,
  borderStyle: 'solid',
  borderWidth: borderTokens.widthThin,
  color: controlTokens.foreground,
  fontFamily: typographyTokens.fontFamily,
  lineHeight: '1.2',
  width: '100%'
} as const;

const disabledControlSurface = {
  ':disabled': {
    backgroundColor: controlTokens.backgroundDisabled,
    color: paletteTokens.mutedForeground
  }
} as const;

export const uiPrimitiveDefinitions = {
  focusVisibleOutline,
  interactiveTransition,
  disabledCursor,
  controlBase,
  disabledControlSurface
} as const;

export const uiPrimitives = stylex.create({
  focusVisibleOutline,
  interactiveTransition,
  disabledCursor,
  controlBase,
  disabledControlSurface
});
