import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import {
  borderTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens
} from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const scrollAreaStyles = stylex.create({
  root: {
    border: `${borderTokens.widthThin} solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    backgroundColor: surfaceTokens.base,
    position: 'relative'
  },
  viewport: {
    overflow: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    outline: 'none'
  },
  scrollbar: {
    backgroundColor: surfaceTokens.softHover,
    borderRadius: radiusTokens.pill,
    display: 'flex',
    flexShrink: 0,
    userSelect: 'none'
  },
  scrollbarVertical: {
    height: '100%',
    minWidth: spacingTokens.md,
    padding: spacingTokens.xxxs,
    position: 'absolute',
    right: spacingTokens.xxxs,
    top: spacingTokens.xxxs,
    bottom: spacingTokens.xxxs
  },
  scrollbarHorizontal: {
    width: '100%',
    minHeight: spacingTokens.md,
    padding: spacingTokens.xxxs,
    position: 'absolute',
    left: spacingTokens.xxxs,
    right: spacingTokens.xxxs,
    bottom: spacingTokens.xxxs
  },
  thumb: {
    backgroundColor: surfaceTokens.softStrong,
    borderRadius: radiusTokens.pill,
    flex: 1
  }
});

export type ScrollbarOrientation = 'vertical' | 'horizontal';

export function getScrollAreaRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([scrollAreaStyles.root], options);
}

export function getScrollAreaViewportStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([scrollAreaStyles.viewport], options);
}

export function getScrollAreaScrollbarStyleProps(
  orientation: ScrollbarOrientation,
  options?: SlotStyleOptions
) {
  return composeStyleProps(
    [
      scrollAreaStyles.scrollbar,
      orientation === 'vertical'
        ? scrollAreaStyles.scrollbarVertical
        : scrollAreaStyles.scrollbarHorizontal
    ],
    options
  );
}

export function getScrollAreaThumbStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([scrollAreaStyles.thumb], options);
}
