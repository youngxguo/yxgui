import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { layerTokens, spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

const popoverStyles = stylex.create({
  content: {
    display: 'grid',
    fontFamily: typographyTokens.fontFamily,
    gap: spacingTokens.sm,
    maxWidth: '20rem',
    padding: spacingTokens.lg,
    position: 'fixed',
    zIndex: layerTokens.floating
  }
});

export function getPopoverContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([popoverStyles.content], options);
}
