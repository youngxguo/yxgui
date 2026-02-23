import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { floatingPrimitives } from '../../styles/floating';
import { radiusTokens, spacingTokens } from '../../theme/tokens/foundationTokens.stylex';
import { overlayTokens } from '../../theme/tokens/semanticTokens.stylex';

const dialogStyles = stylex.create({
  overlay: {
    backgroundColor: overlayTokens.scrim,
    padding: spacingTokens.xl
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
  return composeStyleProps([floatingPrimitives.modalOverlayLayout, dialogStyles.overlay], options);
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
