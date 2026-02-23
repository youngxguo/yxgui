import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { layerTokens, spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

const hoverCardStyles = stylex.create({
  content: {
    fontFamily: typographyTokens.fontFamily,
    maxWidth: '20rem',
    padding: spacingTokens.lg,
    position: 'fixed',
    zIndex: layerTokens.floating
  }
});

export function getHoverCardContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([hoverCardStyles.content], options);
}
