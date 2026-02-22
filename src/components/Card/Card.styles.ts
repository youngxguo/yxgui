import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import {
  borderTokens,
  cardTokens,
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
    boxShadow: cardTokens.shadow,
    color: paletteTokens.foreground,
    display: 'flex',
    flexDirection: 'column',
    transitionDuration: '140ms',
    transitionProperty: 'box-shadow',
    transitionTimingFunction: 'ease'
  },
  rootHover: {
    ':hover': {
      boxShadow: cardTokens.hoverShadow
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacingTokens.xs,
    padding: spacingTokens.lg
  },
  title: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeLg,
    fontWeight: typographyTokens.fontWeightStrong,
    lineHeight: '1.2',
    margin: 0
  },
  description: {
    color: paletteTokens.mutedForeground,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.4',
    margin: 0
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
  return composeStyleProps([cardStyles.root, cardStyles.rootHover], options);
}

export function getCardHeaderStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.header], options);
}

export function getCardTitleStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.title], options);
}

export function getCardDescriptionStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.description], options);
}

export function getCardContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.content], options);
}

export function getCardFooterStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([cardStyles.footer], options);
}
