import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import {
  borderTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
  variantTokens
} from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const alertDialogStyles = stylex.create({
  header: {
    display: 'grid',
    gap: spacingTokens.xs
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: spacingTokens.sm
  },
  buttonBase: {
    borderRadius: radiusTokens.md,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    cursor: 'pointer',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    minHeight: spacingTokens.xxxl,
    padding: `${spacingTokens.xs} ${spacingTokens.lg}`
  },
  cancel: {
    backgroundColor: variantTokens.secondaryBackground,
    borderColor: variantTokens.secondaryBorder,
    color: variantTokens.secondaryForeground
  },
  action: {
    backgroundColor: variantTokens.primaryBackground,
    borderColor: variantTokens.primaryBackground,
    color: variantTokens.primaryForeground
  },
  destructive: {
    backgroundColor: variantTokens.destructiveBackground,
    borderColor: variantTokens.destructiveBorder,
    color: variantTokens.destructiveForeground
  },
  actionHover: {
    ':hover': {
      filter: 'brightness(0.98)'
    }
  },
  cancelHover: {
    ':hover': {
      borderColor: borderTokens.strong
    }
  },
  disabled: {
    ':disabled': {
      cursor: 'not-allowed',
      color: paletteTokens.mutedForeground,
      opacity: 0.65
    }
  }
});

export function getAlertDialogHeaderStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([alertDialogStyles.header], options);
}

export function getAlertDialogFooterStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([alertDialogStyles.footer], options);
}

export function getAlertDialogCancelStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps(
    [
      alertDialogStyles.buttonBase,
      alertDialogStyles.cancel,
      alertDialogStyles.cancelHover,
      alertDialogStyles.disabled
    ],
    options
  );
}

export function getAlertDialogActionStyleProps(destructive: boolean, options?: SlotStyleOptions) {
  return composeStyleProps(
    [
      alertDialogStyles.buttonBase,
      alertDialogStyles.action,
      destructive && alertDialogStyles.destructive,
      alertDialogStyles.actionHover,
      alertDialogStyles.disabled
    ],
    options
  );
}
