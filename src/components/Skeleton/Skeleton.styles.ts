import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { radiusTokens, spacingTokens } from '../../theme/tokens/foundationTokens.stylex';
import { surfaceTokens } from '../../theme/tokens/semanticTokens.stylex';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

interface GetSkeletonStylePropsOptions {
  variant: SkeletonVariant;
  animated: boolean;
  className?: string;
  style?: CSSProperties;
}

const skeletonStyles = stylex.create({
  root: {
    backgroundColor: surfaceTokens.soft,
    display: 'block',
    position: 'relative'
  },
  animated: {
    backgroundImage: `linear-gradient(90deg, ${surfaceTokens.soft} 25%, ${surfaceTokens.subtle} 37%, ${surfaceTokens.soft} 63%)`,
    backgroundSize: '400% 100%'
  },
  text: {
    borderRadius: radiusTokens.sm,
    height: '1em',
    width: '100%'
  },
  rect: {
    borderRadius: radiusTokens.md
  },
  circle: {
    borderRadius: radiusTokens.pill,
    height: spacingTokens.xxxxl,
    width: spacingTokens.xxxxl
  }
});

const variantStyles: Record<SkeletonVariant, unknown> = {
  text: skeletonStyles.text,
  rect: skeletonStyles.rect,
  circle: skeletonStyles.circle
};

export function getSkeletonStyleProps({
  variant,
  animated,
  className,
  style
}: GetSkeletonStylePropsOptions) {
  return composeStyleProps(
    [skeletonStyles.root, pickStyle(variantStyles, variant), animated && skeletonStyles.animated],
    { className, style }
  );
}
