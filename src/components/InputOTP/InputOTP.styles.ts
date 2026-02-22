import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

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
    fontFamily: typographyTokens.fontFamilyMono,
    fontWeight: typographyTokens.fontWeightMedium,
    padding: 0,
    textAlign: 'center',
    width: '2.25rem'
  },
  separator: {
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
  return composeStyleProps([inputOtpStyles.slot], options);
}

export function getInputOtpSeparatorStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([inputOtpStyles.separator], options);
}
