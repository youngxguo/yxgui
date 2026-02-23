import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { paletteTokens, spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

const formFieldStyles = stylex.create({
  root: {
    display: 'grid',
    gap: spacingTokens.xs
  },
  control: {
    display: 'block'
  },
  description: {
    color: paletteTokens.mutedForeground,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.4',
    margin: 0
  },
  error: {
    color: '#b42318',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    fontWeight: typographyTokens.fontWeightMedium,
    lineHeight: '1.4',
    margin: 0
  }
});

export function getFormFieldRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([formFieldStyles.root], options);
}

export function getFormFieldControlStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([formFieldStyles.control], options);
}

export function getFormFieldDescriptionStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([formFieldStyles.description], options);
}

export function getFormFieldErrorStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([formFieldStyles.error], options);
}
