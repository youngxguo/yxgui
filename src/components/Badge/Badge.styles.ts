import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import {
  radiusTokens,
  spacingTokens,
  typographyTokens
} from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens } from '../../theme/tokens/semanticTokens.stylex';
import { badgeStyleTokens } from '../../theme/tokens/componentTokens.stylex';

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
    backgroundColor: badgeStyleTokens.neutralBackground,
    borderColor: badgeStyleTokens.neutralBorder,
    color: badgeStyleTokens.neutralForeground
  },
  success: {
    backgroundColor: badgeStyleTokens.successBackground,
    borderColor: badgeStyleTokens.successBorder,
    color: badgeStyleTokens.successForeground
  },
  warning: {
    backgroundColor: badgeStyleTokens.warningBackground,
    borderColor: badgeStyleTokens.warningBorder,
    color: badgeStyleTokens.warningForeground
  },
  error: {
    backgroundColor: badgeStyleTokens.errorBackground,
    borderColor: badgeStyleTokens.errorBorder,
    color: badgeStyleTokens.errorForeground
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: badgeStyleTokens.outlineBorder,
    color: badgeStyleTokens.outlineForeground
  },
  sm: {
    fontSize: typographyTokens.fontSizeSm,
    minHeight: spacingTokens.xl,
    padding: `${spacingTokens.xxs} ${spacingTokens.md}`
  },
  md: {
    fontSize: typographyTokens.fontSizeMd,
    minHeight: spacingTokens.xl,
    padding: `${spacingTokens.xs} ${spacingTokens.lg}`
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
