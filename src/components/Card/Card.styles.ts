import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, pickStyle, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  radiusTokens,
  shadowTokens,
  spacingTokens,
  typographyTokens
} from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens, colorTokens, surfaceTokens } from '../../theme/tokens/semanticTokens.stylex';

export type CardVariant = 'outlined' | 'elevated';

const cardStyles = stylex.create({
  root: {
    backgroundColor: surfaceTokens.base,
    borderRadius: radiusTokens.md,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    color: colorTokens.foreground,
    display: 'flex',
    flexDirection: 'column'
  },
  outlined: {
    borderColor: borderTokens.default,
    boxShadow: 'none'
  },
  elevated: {
    backgroundColor: surfaceTokens.elevated,
    borderColor: borderTokens.muted,
    boxShadow: shadowTokens.floating
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingTokens.xs,
    padding: spacingTokens.lg
  },
  content: {
    fontFamily: typographyTokens.fontFamily,
    padding: `0 ${spacingTokens.lg} ${spacingTokens.lg}`
  },
  footer: {
    alignItems: 'center',
    display: 'flex',
    gap: spacingTokens.sm,
    justifyContent: 'flex-end',
    padding: `0 ${spacingTokens.lg} ${spacingTokens.lg}`
  }
});

const variantStyles: Record<CardVariant, unknown> = {
  outlined: cardStyles.outlined,
  elevated: cardStyles.elevated
};

export function getCardRootStyleProps(variant: CardVariant, options?: StyleRecipeOverrides) {
  return composeStyleProps([cardStyles.root, pickStyle(variantStyles, variant)], options);
}

export function getCardHeaderStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([cardStyles.header], options);
}

export function getCardContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([cardStyles.content], options);
}

export function getCardFooterStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([cardStyles.footer], options);
}
