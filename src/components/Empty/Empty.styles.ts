import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { radiusTokens, spacingTokens } from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens, colorTokens, surfaceTokens } from '../../theme/tokens/semanticTokens.stylex';

const emptyStyles = stylex.create({
  root: {
    backgroundColor: surfaceTokens.subtle,
    borderColor: borderTokens.muted,
    borderRadius: radiusTokens.md,
    borderStyle: 'dashed',
    borderWidth: borderTokens.widthThin,
    color: colorTokens.foreground,
    display: 'grid',
    gap: spacingTokens.lg,
    justifyItems: 'center',
    padding: spacingTokens.xxxl,
    textAlign: 'center',
    width: '100%'
  },
  media: {
    alignItems: 'center',
    backgroundColor: surfaceTokens.accentMuted,
    borderRadius: radiusTokens.pill,
    color: colorTokens.accent,
    display: 'inline-flex',
    justifyContent: 'center',
    minHeight: spacingTokens.xxxxxl,
    minWidth: spacingTokens.xxxxxl,
    padding: spacingTokens.md
  },
  header: {
    display: 'grid',
    gap: spacingTokens.xxs,
    justifyItems: 'inherit',
    maxWidth: '34rem'
  },
  title: {
    maxWidth: '28rem'
  },
  description: {
    maxWidth: '36rem'
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacingTokens.sm,
    justifyContent: 'center'
  }
});

export function getEmptyRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([emptyStyles.root], options);
}

export function getEmptyMediaStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([emptyStyles.media], options);
}

export function getEmptyHeaderStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([emptyStyles.header], options);
}

export function getEmptyTitleStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([emptyStyles.title], options);
}

export function getEmptyDescriptionStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([emptyStyles.description], options);
}

export function getEmptyActionsStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([emptyStyles.actions], options);
}
