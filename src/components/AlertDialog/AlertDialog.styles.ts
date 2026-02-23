import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens.stylex';

const alertDialogStyles = stylex.create({
  header: {
    display: 'grid',
    gap: spacingTokens.xs
  }
});

export function getAlertDialogHeaderStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([alertDialogStyles.header], options);
}
