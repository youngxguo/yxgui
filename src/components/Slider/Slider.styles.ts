import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { colorTokens } from '../../theme/tokens/semanticTokens.stylex';

const sliderStyles = stylex.create({
  root: {
    accentColor: colorTokens.accent,
    cursor: 'pointer',
    width: '100%'
  },
  disabled: {
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.6
    }
  }
});

export function getSliderStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps(
    [sliderStyles.root, sliderStyles.disabled, uiPrimitives.focusVisibleOutline],
    options
  );
}
