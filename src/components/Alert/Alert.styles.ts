import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import {
  alertTokens,
  borderTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

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
    backgroundColor: alertTokens.infoBackground,
    borderColor: alertTokens.infoBorder
  },
  success: {
    backgroundColor: alertTokens.successBackground,
    borderColor: alertTokens.successBorder
  },
  warning: {
    backgroundColor: alertTokens.warningBackground,
    borderColor: alertTokens.warningBorder
  },
  error: {
    backgroundColor: alertTokens.errorBackground,
    borderColor: alertTokens.errorBorder
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

export function getAlertRootStyleProps(variant: AlertVariant, options?: SlotStyleOptions) {
  return composeStyleProps([alertStyles.root, pickStyle(variantStyles, variant)], options);
}

export function getAlertTitleStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([alertStyles.title], options);
}

export function getAlertDescriptionStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([alertStyles.description], options);
}
