import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import {
  radiusTokens,
  spacingTokens,
  typographyTokens,
  paletteTokens
} from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const dialogStyles = stylex.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(14, 14, 12, 0.45)',
    display: 'flex',
    inset: 0,
    justifyContent: 'center',
    padding: '1rem',
    position: 'fixed',
    zIndex: 1000
  },
  content: {
    borderRadius: radiusTokens.lg,
    display: 'grid',
    gap: spacingTokens.md,
    maxHeight: '85vh',
    maxWidth: '32rem',
    overflow: 'auto',
    padding: spacingTokens.lg,
    width: '100%'
  },
  footer: {
    display: 'flex',
    gap: spacingTokens.sm,
    justifyContent: 'flex-end'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: radiusTokens.sm,
    color: paletteTokens.mutedForeground,
    cursor: 'pointer',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    marginLeft: 'auto',
    padding: '0.25rem 0.4rem'
  }
});

export function getDialogOverlayStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([dialogStyles.overlay], options);
}

export function getDialogContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([dialogStyles.content], options);
}

export function getDialogFooterStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([dialogStyles.footer], options);
}

export function getDialogCloseStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([dialogStyles.closeButton], options);
}
