import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import {
  borderTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens
} from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const emptyStyles = stylex.create({
  root: {
    backgroundColor: surfaceTokens.subtle,
    borderColor: borderTokens.muted,
    borderRadius: radiusTokens.md,
    borderStyle: 'dashed',
    borderWidth: borderTokens.widthThin,
    color: paletteTokens.foreground,
    display: 'grid',
    gap: spacingTokens.lg,
    justifyItems: 'center',
    padding: spacingTokens.xxxl,
    textAlign: 'center',
    width: '100%'
  },
  media: {
    alignItems: 'center',
    backgroundColor: surfaceTokens.accentMuted,
    borderRadius: radiusTokens.pill,
    color: paletteTokens.accent,
    display: 'inline-flex',
    justifyContent: 'center',
    minHeight: spacingTokens.xxxxxl,
    minWidth: spacingTokens.xxxxxl,
    padding: spacingTokens.md
  },
  header: {
    display: 'grid',
    gap: spacingTokens.xxs,
    justifyItems: 'inherit',
    maxWidth: '34rem'
  },
  title: {
    maxWidth: '28rem'
  },
  description: {
    maxWidth: '36rem'
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacingTokens.sm,
    justifyContent: 'center'
  }
});

export function getEmptyRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([emptyStyles.root], options);
}

export function getEmptyMediaStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([emptyStyles.media], options);
}

export function getEmptyHeaderStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([emptyStyles.header], options);
}

export function getEmptyTitleStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([emptyStyles.title], options);
}

export function getEmptyDescriptionStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([emptyStyles.description], options);
}

export function getEmptyActionsStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([emptyStyles.actions], options);
}
