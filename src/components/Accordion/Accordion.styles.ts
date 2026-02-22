import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import {
  borderTokens,
  paletteTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const accordionStyles = stylex.create({
  root: {
    display: 'block',
    overflow: 'hidden',
    width: '100%'
  },
  item: {
    borderBottom: `1px solid ${borderTokens.muted}`
  },
  itemLast: {
    ':last-child': {
      borderBottom: 'none'
    }
  },
  itemDisabled: {
    opacity: 0.7
  },
  header: {
    margin: 0
  },
  trigger: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    color: paletteTokens.foreground,
    cursor: 'pointer',
    display: 'flex',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeMd,
    fontWeight: typographyTokens.fontWeightMedium,
    gap: spacingTokens.sm,
    justifyContent: 'space-between',
    lineHeight: '1.25',
    padding: `${spacingTokens.md} ${spacingTokens.lg}`,
    textAlign: 'left',
    width: '100%'
  },
  triggerHover: {
    ':not(:disabled):hover': {
      backgroundColor: surfaceTokens.subtle
    }
  },
  triggerOpen: {
    backgroundColor: '#fafaf5'
  },
  triggerDisabled: {
    cursor: 'not-allowed'
  },
  indicator: {
    color: paletteTokens.mutedForeground,
    flexShrink: 0,
    fontFamily: typographyTokens.fontFamilyMono,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1'
  },
  content: {
    color: paletteTokens.mutedForeground
  },
  contentInner: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.5',
    padding: `0 ${spacingTokens.lg} ${spacingTokens.lg}`
  }
});

export function getAccordionRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([accordionStyles.root], options);
}

export function getAccordionItemStyleProps(disabled: boolean, options?: SlotStyleOptions) {
  return composeStyleProps(
    [accordionStyles.item, accordionStyles.itemLast, disabled && accordionStyles.itemDisabled],
    options
  );
}

export function getAccordionHeaderStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([accordionStyles.header], options);
}

export function getAccordionTriggerStyleProps(
  open: boolean,
  disabled: boolean,
  options?: SlotStyleOptions
) {
  return composeStyleProps(
    [
      accordionStyles.trigger,
      accordionStyles.triggerHover,
      uiPrimitives.focusVisibleRing,
      uiPrimitives.interactiveTransition,
      open && accordionStyles.triggerOpen,
      disabled && accordionStyles.triggerDisabled
    ],
    options
  );
}

export function getAccordionIndicatorStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([accordionStyles.indicator], options);
}

export function getAccordionContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([accordionStyles.content], options);
}

export function getAccordionContentInnerStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([accordionStyles.contentInner], options);
}
