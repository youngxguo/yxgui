import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import {
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
    borderWidth: '1px',
    color: paletteTokens.foreground,
    display: 'grid',
    gap: spacingTokens.xs,
    padding: spacingTokens.lg
  },
  info: {
    backgroundColor: '#eef3ff',
    borderColor: '#b8c7ff'
  },
  success: {
    backgroundColor: '#eefbf3',
    borderColor: '#8fd4ab'
  },
  warning: {
    backgroundColor: '#fff7e8',
    borderColor: '#f2ca7a'
  },
  error: {
    backgroundColor: '#fff0f0',
    borderColor: '#efb3b3'
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
