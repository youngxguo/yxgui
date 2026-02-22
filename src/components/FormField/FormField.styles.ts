import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { paletteTokens, spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const formFieldStyles = stylex.create({
  root: {
    display: 'grid',
    gap: spacingTokens.xs
  },
  control: {
    display: 'block'
  },
  description: {
    color: paletteTokens.mutedForeground,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.4',
    margin: 0
  },
  error: {
    color: '#b42318',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    fontWeight: typographyTokens.fontWeightMedium,
    lineHeight: '1.4',
    margin: 0
  }
});

export function getFormFieldRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([formFieldStyles.root], options);
}

export function getFormFieldControlStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([formFieldStyles.control], options);
}

export function getFormFieldDescriptionStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([formFieldStyles.description], options);
}

export function getFormFieldErrorStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([formFieldStyles.error], options);
}
