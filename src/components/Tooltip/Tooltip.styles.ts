import * as stylex from '@stylexjs/stylex';
import { floatingPrimitives } from '../../styles/floating';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  colorTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

const tooltipStyles = stylex.create({
  content: {
    backgroundColor: colorTokens.foreground,
    borderRadius: radiusTokens.sm,
    boxShadow: shadowTokens.floating,
    color: colorTokens.background,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.2',
    maxWidth: '16rem',
    padding: `${spacingTokens.xs} ${spacingTokens.sm}`,
    pointerEvents: 'none'
  },
  triggerWrap: {
    display: 'inline-flex'
  }
});

export function getTooltipContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([floatingPrimitives.floatingLayer, tooltipStyles.content], options);
}

export function getTooltipTriggerWrapStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tooltipStyles.triggerWrap], options);
}
