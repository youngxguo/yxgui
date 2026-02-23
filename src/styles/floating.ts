import * as stylex from '@stylexjs/stylex';
import { layerTokens, spacingTokens, typographyTokens } from '../theme/tokens.stylex';

const floatingLayer = {
  position: 'fixed',
  zIndex: layerTokens.floating
} as const;

const modalOverlayLayout = {
  alignItems: 'center',
  display: 'flex',
  inset: 0,
  justifyContent: 'center',
  position: 'fixed',
  zIndex: layerTokens.floating
} as const;

const cardContent = {
  fontFamily: typographyTokens.fontFamily,
  maxWidth: '20rem',
  padding: spacingTokens.lg,
  position: 'fixed',
  zIndex: layerTokens.floating
} as const;

export const floatingPrimitiveDefinitions = {
  floatingLayer,
  modalOverlayLayout,
  cardContent
} as const;

export const floatingPrimitives = stylex.create({
  floatingLayer,
  modalOverlayLayout,
  cardContent
});
