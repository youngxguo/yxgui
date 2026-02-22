import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { stylexVars as vars } from '../../theme/stylexVars.stylex';

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
    borderRadius: vars.radiusSm,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'inline-flex',
    fontFamily: vars.typographyFontFamily,
    fontWeight: vars.typographyFontWeightStrong,
    lineHeight: vars.typographyLineHeightTight,
    whiteSpace: 'nowrap'
  },
  primary: {
    backgroundColor: vars.variantsPrimaryBackground,
    borderColor: vars.variantsPrimaryBackground,
    color: vars.variantsPrimaryForeground
  },
  secondary: {
    backgroundColor: vars.variantsSecondaryBackground,
    borderColor: vars.variantsSecondaryBackground,
    color: vars.variantsSecondaryForeground
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: vars.variantsOutlineBorder,
    color: vars.variantsOutlineForeground
  },
  sm: {
    fontSize: vars.typographyFontSizeSm,
    minHeight: '1.4rem',
    padding: '0.15rem 0.5rem'
  },
  md: {
    fontSize: vars.typographyFontSizeMd,
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
