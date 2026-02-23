import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  borderTokens,
  colorTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

const cardStyles = stylex.create({
  root: {
    backgroundColor: surfaceTokens.base,
    borderColor: borderTokens.default,
    borderRadius: radiusTokens.md,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    color: colorTokens.foreground,
    display: 'flex',
    flexDirection: 'column'
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

export function getCardRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([cardStyles.root], options);
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
