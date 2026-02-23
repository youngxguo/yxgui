import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const alertDialogStyles = stylex.create({
  header: {
    display: 'grid',
    gap: spacingTokens.xs
  }
});

export function getAlertDialogHeaderStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([alertDialogStyles.header], options);
}
