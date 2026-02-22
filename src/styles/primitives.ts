import * as stylex from '@stylexjs/stylex';
import {
  borderTokens,
  controlTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens
} from '../theme/tokens.stylex';

export const uiPrimitives = stylex.create({
  focusVisibleRing: {
    ':focus-visible': {
      outlineColor: borderTokens.focus,
      outlineOffset: spacingTokens.xxxs,
      outlineStyle: 'solid',
      outlineWidth: spacingTokens.xxxs
    }
  },
  interactiveTransition: {
    transitionDuration: '120ms',
    transitionProperty: 'transform, box-shadow, background-color, border-color, color',
    transitionTimingFunction: 'ease'
  },
  disabledCursor: {
    ':disabled': {
      cursor: 'not-allowed'
    }
  },
  controlBase: {
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
  },
  disabledControlSurface: {
    ':disabled': {
      backgroundColor: controlTokens.backgroundDisabled,
      color: paletteTokens.mutedForeground
    }
  }
});
