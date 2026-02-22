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

const cardStyles = stylex.create({
  root: {
    backgroundColor: surfaceTokens.elevated,
    borderColor: borderTokens.default,
    borderRadius: radiusTokens.md,
    borderStyle: 'solid',
    borderWidth: '1px',
    color: paletteTokens.foreground,
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

export function getCardRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.root], options);
}

export function getCardHeaderStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.header], options);
}

export function getCardContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.content], options);
}

export function getCardFooterStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.footer], options);
}
