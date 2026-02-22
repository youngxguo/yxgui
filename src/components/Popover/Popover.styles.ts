import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import {
  borderTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const popoverStyles = stylex.create({
  content: {
    backgroundColor: surfaceTokens.elevated,
    border: `1px solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    boxShadow: '0 8px 20px rgba(22,22,20,0.14)',
    color: paletteTokens.foreground,
    fontFamily: typographyTokens.fontFamily,
    maxWidth: '20rem',
    padding: spacingTokens.lg,
    position: 'fixed',
    zIndex: 1000
  }
});

export function getPopoverContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([popoverStyles.content], options);
}
