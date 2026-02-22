import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { radiusTokens, typographyTokens, variantTokens } from '../../theme/tokens.stylex';

export type BadgeVariant = 'primary' | 'secondary' | 'outline';
export type BadgeSize = 'sm' | 'md';

interface GetBadgeStylePropsOptions {
  variant: BadgeVariant;
  size: BadgeSize;
  className?: string;
  style?: CSSProperties;
}

const badgeStyles = stylex.create({
  root: {
    alignItems: 'center',
    borderRadius: radiusTokens.sm,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'inline-flex',
    fontFamily: typographyTokens.fontFamily,
    fontWeight: typographyTokens.fontWeightStrong,
    lineHeight: typographyTokens.lineHeightTight,
    whiteSpace: 'nowrap'
  },
  primary: {
    backgroundColor: variantTokens.primaryBackground,
    borderColor: variantTokens.primaryBackground,
    color: variantTokens.primaryForeground
  },
  secondary: {
    backgroundColor: variantTokens.secondaryBackground,
    borderColor: variantTokens.secondaryBackground,
    color: variantTokens.secondaryForeground
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: variantTokens.outlineBorder,
    color: variantTokens.outlineForeground
  },
  sm: {
    fontSize: typographyTokens.fontSizeSm,
    minHeight: '1.4rem',
    padding: '0.15rem 0.5rem'
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: '1.75rem',
    padding: '0.25rem 0.65rem'
  }
});

const badgeVariantStyles: Record<BadgeVariant, unknown> = {
  primary: badgeStyles.primary,
  secondary: badgeStyles.secondary,
  outline: badgeStyles.outline
};

const badgeSizeStyles: Record<BadgeSize, unknown> = {
  sm: badgeStyles.sm,
  md: badgeStyles.md
};

export function getBadgeStyleProps({ variant, size, className, style }: GetBadgeStylePropsOptions) {
  return composeStyleProps(
    [badgeStyles.root, pickStyle(badgeVariantStyles, variant), pickStyle(badgeSizeStyles, size)],
    { className, style }
  );
}
