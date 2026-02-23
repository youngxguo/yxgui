import * as stylex from '@stylexjs/stylex';
import type { ToastClassnames } from 'sonner';
import { composeStyleProps } from '../../styles/recipes';
import {
  borderTokens,
  cardTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  statusTokens,
  surfaceTokens,
  typographyTokens,
  variantTokens
} from '../../theme/tokens.stylex';

const sonnerStyles = stylex.create({
  toaster: {
    fontFamily: typographyTokens.fontFamily
  },
  toast: {
    borderRadius: radiusTokens.md,
    boxShadow: cardTokens.shadow
  },
  title: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    fontWeight: typographyTokens.fontWeightMedium,
    lineHeight: typographyTokens.lineHeightNormal
  },
  description: {
    color: paletteTokens.mutedForeground,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightNormal
  },
  actionButton: {
    borderRadius: radiusTokens.sm,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeXs,
    fontWeight: typographyTokens.fontWeightMedium
  },
  cancelButton: {
    borderRadius: radiusTokens.sm,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeXs,
    fontWeight: typographyTokens.fontWeightMedium
  },
  closeButton: {
    borderRadius: radiusTokens.pill,
    color: paletteTokens.foreground
  }
});

function classNameOf(...styles: ReadonlyArray<unknown>) {
  return composeStyleProps(styles).className;
}

export function getSonnerToasterClassName() {
  return classNameOf(sonnerStyles.toaster);
}

export function getSonnerToastClassNames(): ToastClassnames {
  return {
    toast: classNameOf(sonnerStyles.toast),
    title: classNameOf(sonnerStyles.title),
    description: classNameOf(sonnerStyles.description),
    actionButton: classNameOf(sonnerStyles.actionButton),
    cancelButton: classNameOf(sonnerStyles.cancelButton),
    closeButton: classNameOf(sonnerStyles.closeButton)
  };
}

export function getSonnerThemeVariables() {
  return {
    '--border-radius': radiusTokens.md,
    '--normal-bg': surfaceTokens.elevated,
    '--normal-border': borderTokens.default,
    '--normal-text': paletteTokens.foreground,
    '--success-bg': statusTokens.successBackground,
    '--success-border': statusTokens.successBorder,
    '--success-text': statusTokens.successForeground,
    '--info-bg': statusTokens.infoBackground,
    '--info-border': statusTokens.infoBorder,
    '--info-text': statusTokens.infoForeground,
    '--warning-bg': statusTokens.warningBackground,
    '--warning-border': statusTokens.warningBorder,
    '--warning-text': statusTokens.warningForeground,
    '--error-bg': statusTokens.errorBackground,
    '--error-border': statusTokens.errorBorder,
    '--error-text': statusTokens.errorForeground,
    '--width': '22rem'
  } as const;
}

export function getSonnerToastBaseStyle() {
  return {
    boxShadow: cardTokens.shadow,
    color: paletteTokens.foreground
  } as const;
}

export function getSonnerButtonStyles() {
  return {
    action: {
      background: variantTokens.primaryBackground,
      borderRadius: radiusTokens.sm,
      color: variantTokens.primaryForeground,
      fontFamily: typographyTokens.fontFamily,
      fontWeight: typographyTokens.fontWeightMedium,
      padding: `${spacingTokens.xxs} ${spacingTokens.half}`
    },
    cancel: {
      background: surfaceTokens.soft,
      borderRadius: radiusTokens.sm,
      color: paletteTokens.foreground,
      fontFamily: typographyTokens.fontFamily,
      fontWeight: typographyTokens.fontWeightMedium,
      padding: `${spacingTokens.xxs} ${spacingTokens.half}`
    },
    close: {
      background: surfaceTokens.elevated,
      borderColor: borderTokens.default,
      color: paletteTokens.foreground
    }
  } as const;
}
