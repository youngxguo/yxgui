import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import {
  badgeTokens,
  borderTokens,
  controlTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'outline';
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
    borderRadius: radiusTokens.pill,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    display: 'inline-flex',
    fontFamily: typographyTokens.fontFamily,
    fontWeight: typographyTokens.fontWeightMedium,
    lineHeight: typographyTokens.lineHeightTight,
    whiteSpace: 'nowrap'
  },
  neutral: {
    backgroundColor: badgeTokens.neutralBackground,
    borderColor: badgeTokens.neutralBorder,
    color: badgeTokens.neutralForeground
  },
  success: {
    backgroundColor: badgeTokens.successBackground,
    borderColor: badgeTokens.successBorder,
    color: badgeTokens.successForeground
  },
  warning: {
    backgroundColor: badgeTokens.warningBackground,
    borderColor: badgeTokens.warningBorder,
    color: badgeTokens.warningForeground
  },
  error: {
    backgroundColor: badgeTokens.errorBackground,
    borderColor: badgeTokens.errorBorder,
    color: badgeTokens.errorForeground
  },
  outline: {
    backgroundColor: controlTokens.background,
    borderColor: borderTokens.default,
    color: paletteTokens.mutedForeground
  },
  sm: {
    fontSize: typographyTokens.fontSizeSm,
    minHeight: spacingTokens.xl,
    padding: `${spacingTokens.xxxs} ${spacingTokens.half}`
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: spacingTokens.xxl,
    padding: `${spacingTokens.xxxs} ${spacingTokens.md}`
  }
});

const badgeVariantStyles: Record<BadgeVariant, unknown> = {
  neutral: badgeStyles.neutral,
  success: badgeStyles.success,
  warning: badgeStyles.warning,
  error: badgeStyles.error,
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
