import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { radiusTokens, spacingTokens } from '../../theme/tokens.stylex';

const dialogStyles = stylex.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(14, 14, 12, 0.45)',
    display: 'flex',
    inset: 0,
    justifyContent: 'center',
    padding: spacingTokens.xl,
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
    marginLeft: 'auto'
  }
});

export function getDialogOverlayStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([dialogStyles.overlay], options);
}

export function getDialogContentStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([dialogStyles.content], options);
}

export function getDialogFooterStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([dialogStyles.footer], options);
}

export function getDialogCloseStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([dialogStyles.closeButton], options);
}
