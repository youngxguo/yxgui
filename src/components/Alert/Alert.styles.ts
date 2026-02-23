import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, pickStyle, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  borderTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  statusTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const alertStyles = stylex.create({
  root: {
    borderRadius: radiusTokens.md,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    color: paletteTokens.foreground,
    display: 'grid',
    gap: spacingTokens.xs,
    padding: spacingTokens.lg
  },
  info: {
    backgroundColor: statusTokens.infoBackground,
    borderColor: statusTokens.infoBorder,
    color: statusTokens.infoForeground
  },
  success: {
    backgroundColor: statusTokens.successBackground,
    borderColor: statusTokens.successBorder,
    color: statusTokens.successForeground
  },
  warning: {
    backgroundColor: statusTokens.warningBackground,
    borderColor: statusTokens.warningBorder,
    color: statusTokens.warningForeground
  },
  error: {
    backgroundColor: statusTokens.errorBackground,
    borderColor: statusTokens.errorBorder,
    color: statusTokens.errorForeground
  },
  title: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeMd,
    fontWeight: typographyTokens.fontWeightStrong,
    lineHeight: '1.3',
    margin: 0
  },
  description: {
    color: paletteTokens.mutedForeground,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.4',
    margin: 0
  }
});

const variantStyles: Record<AlertVariant, unknown> = {
  info: alertStyles.info,
  success: alertStyles.success,
  warning: alertStyles.warning,
  error: alertStyles.error
};

export function getAlertRootStyleProps(variant: AlertVariant, options?: StyleRecipeOverrides) {
  return composeStyleProps([alertStyles.root, pickStyle(variantStyles, variant)], options);
}

export function getAlertTitleStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([alertStyles.title], options);
}

export function getAlertDescriptionStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([alertStyles.description], options);
}
