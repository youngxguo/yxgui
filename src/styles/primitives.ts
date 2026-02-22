import * as stylex from '@stylexjs/stylex';
import { type ThemeCSSVariableRef } from '../theme/vars.stylex';

const varBorderFocus = 'var(--yxgui-border-focus)' as ThemeCSSVariableRef;
const varControlBackground = 'var(--yxgui-control-background)' as ThemeCSSVariableRef;
const varControlBackgroundDisabled =
  'var(--yxgui-control-background-disabled)' as ThemeCSSVariableRef;
const varControlBorder = 'var(--yxgui-control-border)' as ThemeCSSVariableRef;
const varControlForeground = 'var(--yxgui-control-foreground)' as ThemeCSSVariableRef;
const varPaletteMutedForeground = 'var(--yxgui-palette-muted-foreground)' as ThemeCSSVariableRef;
const varRadiusMd = 'var(--yxgui-radius-md)' as ThemeCSSVariableRef;
const varTypographyFontFamily = 'var(--yxgui-typography-font-family)' as ThemeCSSVariableRef;

export const uiPrimitives = stylex.create({
  focusVisibleRing: {
    ':focus-visible': {
      outlineColor: varBorderFocus,
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
    backgroundColor: varControlBackground,
    borderColor: varControlBorder,
    borderRadius: varRadiusMd,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: varControlForeground,
    fontFamily: varTypographyFontFamily,
    lineHeight: '1.2',
    width: '100%'
  },
  disabledControlSurface: {
    ':disabled': {
      backgroundColor: varControlBackgroundDisabled,
      color: varPaletteMutedForeground
    }
  }
});
