import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
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

const collapsibleStyles = stylex.create({
  root: {
    backgroundColor: surfaceTokens.elevated,
    border: `1px solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    display: 'grid',
    overflow: 'hidden'
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
    borderBottom: `1px solid ${borderTokens.muted}`
  },
  triggerDisabled: {
    cursor: 'not-allowed',
    opacity: 0.65
  },
  indicator: {
    color: paletteTokens.mutedForeground,
    flexShrink: 0,
    fontFamily: typographyTokens.fontFamilyMono,
    fontSize: typographyTokens.fontSizeSm
  },
  content: {
    color: paletteTokens.foreground
  },
  contentInner: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightRelaxed,
    padding: spacingTokens.lg
  }
});

export function getCollapsibleRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([collapsibleStyles.root], options);
}

export function getCollapsibleTriggerStyleProps(
  open: boolean,
  disabled: boolean,
  options?: SlotStyleOptions
) {
  return composeStyleProps(
    [
      collapsibleStyles.trigger,
      collapsibleStyles.triggerHover,
      uiPrimitives.focusVisibleRing,
      uiPrimitives.interactiveTransition,
      open && collapsibleStyles.triggerOpen,
      disabled && collapsibleStyles.triggerDisabled
    ],
    options
  );
}

export function getCollapsibleIndicatorStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([collapsibleStyles.indicator], options);
}

export function getCollapsibleContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([collapsibleStyles.content], options);
}

export function getCollapsibleContentInnerStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([collapsibleStyles.contentInner], options);
}
