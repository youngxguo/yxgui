import { floatingPrimitives } from '../../styles/floating';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';

export function getHoverCardContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([floatingPrimitives.cardContent], options);
}
