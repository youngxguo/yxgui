import * as stylex from '@stylexjs/stylex';
import { floatingPrimitives } from '../../styles/floating';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens.stylex';

const popoverStyles = stylex.create({
  content: {
    display: 'grid',
    gap: spacingTokens.sm
  }
});

export function getPopoverContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([floatingPrimitives.cardContent, popoverStyles.content], options);
}
