import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import { radiusTokens, spacingTokens } from '../../theme/tokens.stylex';

export type CarouselOrientation = 'horizontal' | 'vertical';
export type CarouselControlDirection = 'previous' | 'next';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const carouselStyles = stylex.create({
  root: {
    display: 'grid',
    gap: spacingTokens.sm,
    position: 'relative',
    width: '100%'
  },
  viewport: {
    borderRadius: radiusTokens.lg,
    overflow: 'hidden',
    width: '100%'
  },
  content: {
    display: 'flex',
    transitionDuration: '180ms',
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease',
    width: '100%',
    willChange: 'transform'
  },
  contentVertical: {
    flexDirection: 'column'
  },
  item: {
    flex: '0 0 100%',
    minWidth: '100%',
    width: '100%'
  },
  itemVertical: {
    minHeight: '100%'
  },
  control: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1
  },
  controlPrevious: {
    left: spacingTokens.xs
  },
  controlNext: {
    right: spacingTokens.xs
  }
});

const contentOrientationStyles: Record<CarouselOrientation, unknown> = {
  horizontal: null,
  vertical: carouselStyles.contentVertical
};

const itemOrientationStyles: Record<CarouselOrientation, unknown> = {
  horizontal: null,
  vertical: carouselStyles.itemVertical
};

const controlDirectionStyles: Record<CarouselControlDirection, unknown> = {
  previous: carouselStyles.controlPrevious,
  next: carouselStyles.controlNext
};

export function getCarouselRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([carouselStyles.root], options);
}

export function getCarouselViewportStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([carouselStyles.viewport, uiPrimitives.focusVisibleOutline], options);
}

export function getCarouselContentStyleProps(
  orientation: CarouselOrientation,
  options?: SlotStyleOptions
) {
  return composeStyleProps(
    [carouselStyles.content, pickStyle(contentOrientationStyles, orientation)],
    options
  );
}

export function getCarouselItemStyleProps(
  orientation: CarouselOrientation,
  options?: SlotStyleOptions
) {
  return composeStyleProps(
    [carouselStyles.item, pickStyle(itemOrientationStyles, orientation)],
    options
  );
}

export function getCarouselControlStyleProps(
  direction: CarouselControlDirection,
  options?: SlotStyleOptions
) {
  return composeStyleProps(
    [carouselStyles.control, pickStyle(controlDirectionStyles, direction)],
    options
  );
}
