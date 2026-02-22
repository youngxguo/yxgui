import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { type ThemeCSSVariableRef } from '../../theme/vars.stylex';

const varRadiusSm = 'var(--yxgui-radius-sm)' as ThemeCSSVariableRef;
const varTypographyFontFamily = 'var(--yxgui-typography-font-family)' as ThemeCSSVariableRef;
const varTypographyFontSizeMd = 'var(--yxgui-typography-font-size-md)' as ThemeCSSVariableRef;
const varTypographyFontSizeSm = 'var(--yxgui-typography-font-size-sm)' as ThemeCSSVariableRef;
const varTypographyFontWeightStrong =
  'var(--yxgui-typography-font-weight-strong)' as ThemeCSSVariableRef;
const varTypographyLineHeightTight =
  'var(--yxgui-typography-line-height-tight)' as ThemeCSSVariableRef;
const varVariantsOutlineBorder = 'var(--yxgui-variants-outline-border)' as ThemeCSSVariableRef;
const varVariantsOutlineForeground =
  'var(--yxgui-variants-outline-foreground)' as ThemeCSSVariableRef;
const varVariantsPrimaryBackground =
  'var(--yxgui-variants-primary-background)' as ThemeCSSVariableRef;
const varVariantsPrimaryForeground =
  'var(--yxgui-variants-primary-foreground)' as ThemeCSSVariableRef;
const varVariantsSecondaryBackground =
  'var(--yxgui-variants-secondary-background)' as ThemeCSSVariableRef;
const varVariantsSecondaryForeground =
  'var(--yxgui-variants-secondary-foreground)' as ThemeCSSVariableRef;

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
    borderRadius: varRadiusSm,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'inline-flex',
    fontFamily: varTypographyFontFamily,
    fontWeight: varTypographyFontWeightStrong,
    lineHeight: varTypographyLineHeightTight,
    whiteSpace: 'nowrap'
  },
  primary: {
    backgroundColor: varVariantsPrimaryBackground,
    borderColor: varVariantsPrimaryBackground,
    color: varVariantsPrimaryForeground
  },
  secondary: {
    backgroundColor: varVariantsSecondaryBackground,
    borderColor: varVariantsSecondaryBackground,
    color: varVariantsSecondaryForeground
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: varVariantsOutlineBorder,
    color: varVariantsOutlineForeground
  },
  sm: {
    fontSize: varTypographyFontSizeSm,
    minHeight: '1.4rem',
    padding: '0.15rem 0.5rem'
  },
  md: {
    fontSize: varTypographyFontSizeMd,
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
