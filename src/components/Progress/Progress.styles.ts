import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, pickStyle, type StyleRecipeOverrides } from '../../styles/recipes';
import { radiusTokens, spacingTokens } from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens, colorTokens, surfaceTokens } from '../../theme/tokens/semanticTokens.stylex';

export type ProgressSize = 'sm' | 'md' | 'lg';

const progressStyles = stylex.create({
  root: {
    backgroundColor: surfaceTokens.soft,
    borderColor: borderTokens.muted,
    borderRadius: radiusTokens.pill,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  sm: { height: spacingTokens.xs },
  md: { height: spacingTokens.half },
  lg: { height: spacingTokens.lg },
  indicator: {
    backgroundColor: colorTokens.accent,
    borderRadius: radiusTokens.pill,
    height: '100%',
    transitionDuration: '160ms',
    transitionProperty: 'width',
    transitionTimingFunction: 'ease'
  }
});

const sizeStyles: Record<ProgressSize, unknown> = {
  sm: progressStyles.sm,
  md: progressStyles.md,
  lg: progressStyles.lg
};

export function getProgressRootStyleProps(size: ProgressSize, options?: StyleRecipeOverrides) {
  return composeStyleProps([progressStyles.root, pickStyle(sizeStyles, size)], options);
}

export function getProgressIndicatorStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([progressStyles.indicator], options);
}
