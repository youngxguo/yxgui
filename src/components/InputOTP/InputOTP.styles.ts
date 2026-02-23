import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { spacingTokens, typographyTokens } from '../../theme/tokens/foundationTokens.stylex';

const inputOtpStyles = stylex.create({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: spacingTokens.sm
  },
  group: {
    alignItems: 'center',
    display: 'inline-flex',
    gap: spacingTokens.xs
  },
  slot: {
    fontFamily: typographyTokens.fontFamilyMono,
    fontWeight: typographyTokens.fontWeightMedium,
    padding: 0,
    textAlign: 'center',
    width: '2.25rem'
  },
  separator: {
    userSelect: 'none'
  }
});

export function getInputOtpRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([inputOtpStyles.root], options);
}

export function getInputOtpGroupStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([inputOtpStyles.group], options);
}

export function getInputOtpSlotStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([inputOtpStyles.slot], options);
}

export function getInputOtpSeparatorStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([inputOtpStyles.separator], options);
}
