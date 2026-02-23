import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import {
  borderTokens,
  colorTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'text'
  | 'lead'
  | 'muted'
  | 'small'
  | 'code'
  | 'blockquote';

interface GetTypographyStylePropsOptions {
  variant: TypographyVariant;
  className?: string;
  style?: CSSProperties;
}

const typographyStyles = stylex.create({
  root: {
    color: colorTokens.foreground,
    fontFamily: typographyTokens.fontFamily,
    margin: 0
  },
  h1: {
    fontSize: typographyTokens.fontSize3xl,
    fontWeight: typographyTokens.fontWeightStrong,
    letterSpacing: typographyTokens.letterSpacingTight,
    lineHeight: typographyTokens.lineHeightSnug
  },
  h2: {
    borderBottomColor: borderTokens.muted,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    fontSize: typographyTokens.fontSize2xl,
    fontWeight: typographyTokens.fontWeightStrong,
    letterSpacing: typographyTokens.letterSpacingTight,
    lineHeight: typographyTokens.lineHeightSnug,
    paddingBottom: spacingTokens.sm
  },
  h3: {
    fontSize: typographyTokens.fontSizeXl,
    fontWeight: typographyTokens.fontWeightStrong,
    lineHeight: typographyTokens.lineHeightSnug
  },
  h4: {
    fontSize: typographyTokens.fontSizeLg,
    fontWeight: typographyTokens.fontWeightStrong,
    lineHeight: typographyTokens.lineHeightSnug
  },
  text: {
    fontSize: typographyTokens.fontSizeMd,
    lineHeight: typographyTokens.lineHeightRelaxed
  },
  lead: {
    color: colorTokens.mutedForeground,
    fontSize: typographyTokens.fontSizeXl,
    lineHeight: typographyTokens.lineHeightRelaxed
  },
  muted: {
    color: colorTokens.mutedForeground,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightNormal
  },
  small: {
    fontSize: typographyTokens.fontSizeSm,
    fontWeight: typographyTokens.fontWeightMedium,
    lineHeight: typographyTokens.lineHeightNormal
  },
  code: {
    backgroundColor: surfaceTokens.subtle,
    borderRadius: radiusTokens.sm,
    fontFamily: typographyTokens.fontFamilyMono,
    fontSize: typographyTokens.fontSizeSm,
    padding: '0.12rem 0.35rem'
  },
  blockquote: {
    borderLeftColor: borderTokens.strong,
    borderLeftStyle: 'solid',
    borderLeftWidth: '3px',
    fontSize: typographyTokens.fontSizeMd,
    fontStyle: 'italic',
    lineHeight: typographyTokens.lineHeightRelaxed,
    paddingLeft: spacingTokens.lg
  }
});

const typographyVariantStyles: Record<TypographyVariant, unknown> = {
  h1: typographyStyles.h1,
  h2: typographyStyles.h2,
  h3: typographyStyles.h3,
  h4: typographyStyles.h4,
  text: typographyStyles.text,
  lead: typographyStyles.lead,
  muted: typographyStyles.muted,
  small: typographyStyles.small,
  code: typographyStyles.code,
  blockquote: typographyStyles.blockquote
};

export function getTypographyStyleProps({
  variant,
  className,
  style
}: GetTypographyStylePropsOptions) {
  return composeStyleProps([typographyStyles.root, pickStyle(typographyVariantStyles, variant)], {
    className,
    style
  });
}
