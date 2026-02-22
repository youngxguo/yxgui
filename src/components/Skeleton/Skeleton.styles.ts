import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { radiusTokens } from '../../theme/tokens.stylex';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

interface GetSkeletonStylePropsOptions {
  variant: SkeletonVariant;
  animated: boolean;
  className?: string;
  style?: CSSProperties;
}

const skeletonStyles = stylex.create({
  root: {
    backgroundColor: '#ecebe4',
    display: 'block',
    position: 'relative'
  },
  animated: {
    backgroundImage: 'linear-gradient(90deg, #ecebe4 25%, #f5f4ee 37%, #ecebe4 63%)',
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
    height: '2.5rem',
    width: '2.5rem'
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
