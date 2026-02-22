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
    borderWidth: '1px',
    cursor: 'pointer',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    minHeight: '2rem',
    padding: '0.4rem 0.8rem'
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
    backgroundColor: '#dc2626',
    borderColor: '#b91c1c',
    color: '#fff5f5'
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
