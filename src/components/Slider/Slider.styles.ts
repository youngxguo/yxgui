import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { borderTokens, paletteTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const sliderStyles = stylex.create({
  root: {
    accentColor: paletteTokens.accent,
    cursor: 'pointer',
    width: '100%'
  },
  disabled: {
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.6
    }
  },
  focusVisible: {
    ':focus-visible': {
      outlineColor: borderTokens.focus,
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineWidth: '2px'
    }
  }
});

export function getSliderStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps(
    [sliderStyles.root, sliderStyles.disabled, sliderStyles.focusVisible],
    options
  );
}
