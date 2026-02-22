import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const hoverCardStyles = stylex.create({
  content: {
    fontFamily: typographyTokens.fontFamily,
    maxWidth: '20rem',
    padding: spacingTokens.lg,
    position: 'fixed',
    zIndex: 1000
  }
});

export function getHoverCardContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([hoverCardStyles.content], options);
}
