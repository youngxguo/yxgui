import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const popoverStyles = stylex.create({
  content: {
    display: 'grid',
    fontFamily: typographyTokens.fontFamily,
    gap: spacingTokens.sm,
    maxWidth: '20rem',
    padding: spacingTokens.lg,
    position: 'fixed',
    zIndex: 1000
  }
});

export function getPopoverContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([popoverStyles.content], options);
}
