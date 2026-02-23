import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  layerTokens,
  paletteTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

const tooltipStyles = stylex.create({
  content: {
    backgroundColor: paletteTokens.foreground,
    borderRadius: radiusTokens.sm,
    boxShadow: shadowTokens.floating,
    color: paletteTokens.background,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.2',
    maxWidth: '16rem',
    padding: `${spacingTokens.xs} ${spacingTokens.sm}`,
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: layerTokens.floating
  },
  triggerWrap: {
    display: 'inline-flex'
  }
});

export function getTooltipContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tooltipStyles.content], options);
}

export function getTooltipTriggerWrapStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tooltipStyles.triggerWrap], options);
}
