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

const inputOtpStyles = stylex.create({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: spacingTokens.sm
  },
  group: {
    alignItems: 'center',
    display: 'inline-flex',
    gap: spacingTokens.xs
  },
  slot: {
    backgroundColor: surfaceTokens.elevated,
    border: `1px solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    color: paletteTokens.foreground,
    fontFamily: typographyTokens.fontFamilyMono,
    fontSize: typographyTokens.fontSizeLg,
    fontWeight: typographyTokens.fontWeightMedium,
    height: '2.5rem',
    textAlign: 'center',
    width: '2.25rem'
  },
  slotFocusVisible: {
    ':focus-visible': {
      borderColor: borderTokens.focus,
      outline: 'none'
    }
  },
  slotDisabled: {
    ':disabled': {
      cursor: 'not-allowed',
      opacity: 0.6
    }
  },
  separator: {
    color: paletteTokens.mutedForeground,
    fontFamily: typographyTokens.fontFamily,
    userSelect: 'none'
  }
});

export function getInputOtpRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([inputOtpStyles.root], options);
}

export function getInputOtpGroupStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([inputOtpStyles.group], options);
}

export function getInputOtpSlotStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps(
    [inputOtpStyles.slot, inputOtpStyles.slotFocusVisible, inputOtpStyles.slotDisabled],
    options
  );
}

export function getInputOtpSeparatorStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([inputOtpStyles.separator], options);
}
