import * as stylex from '@stylexjs/stylex';
import { stylexVars as vars } from '../theme/stylexVars.stylex';

export const uiPrimitives = stylex.create({
  focusVisibleRing: {
    ':focus-visible': {
      outlineColor: vars.borderFocus,
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineWidth: '2px'
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
    backgroundColor: vars.controlBackground,
    borderColor: vars.controlBorder,
    borderRadius: vars.radiusMd,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: vars.controlForeground,
    fontFamily: vars.typographyFontFamily,
    lineHeight: '1.2',
    width: '100%'
  },
  disabledControlSurface: {
    ':disabled': {
      backgroundColor: vars.controlBackgroundDisabled,
      color: vars.paletteMutedForeground
    }
  }
});
