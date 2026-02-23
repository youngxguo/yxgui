import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { radiusTokens, spacingTokens } from '../../theme/tokens.stylex';

const toggleGroupStyles = stylex.create({
  root: {
    display: 'inline-flex',
    gap: spacingTokens.xs,
    alignItems: 'center'
  },
  rootVertical: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  item: {
    borderRadius: radiusTokens.md
  }
});

export type ToggleGroupOrientation = 'horizontal' | 'vertical';

export function getToggleGroupRootStyleProps(
  orientation: ToggleGroupOrientation,
  options?: StyleRecipeOverrides
) {
  return composeStyleProps(
    [toggleGroupStyles.root, orientation === 'vertical' && toggleGroupStyles.rootVertical],
    options
  );
}

export function getToggleGroupItemStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([toggleGroupStyles.item], options);
}
