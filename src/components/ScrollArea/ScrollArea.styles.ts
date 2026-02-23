import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  borderTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens
} from '../../theme/tokens.stylex';

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
    outline: 'none',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '::-webkit-scrollbar': {
      display: 'none'
    }
  },
  scrollbar: {
    backgroundColor: surfaceTokens.softHover,
    borderRadius: radiusTokens.pill,
    display: 'block',
    flexShrink: 0,
    userSelect: 'none',
    overflow: 'hidden'
  },
  scrollbarVertical: {
    width: spacingTokens.md,
    padding: spacingTokens.xxxs,
    position: 'absolute',
    right: spacingTokens.xxxs,
    top: spacingTokens.xxxs,
    bottom: spacingTokens.xxxs
  },
  scrollbarHorizontal: {
    height: spacingTokens.md,
    padding: spacingTokens.xxxs,
    position: 'absolute',
    left: spacingTokens.xxxs,
    right: spacingTokens.xxxs,
    bottom: spacingTokens.xxxs
  },
  thumb: {
    backgroundColor: surfaceTokens.softStrong,
    borderRadius: radiusTokens.pill
  },
  thumbVertical: {
    width: '100%'
  },
  thumbHorizontal: {
    height: '100%'
  }
});

export type ScrollbarOrientation = 'vertical' | 'horizontal';

export function getScrollAreaRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([scrollAreaStyles.root], options);
}

export function getScrollAreaViewportStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([scrollAreaStyles.viewport], options);
}

export function getScrollAreaScrollbarStyleProps(
  orientation: ScrollbarOrientation,
  options?: StyleRecipeOverrides
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

export function getScrollAreaThumbStyleProps(
  orientation: ScrollbarOrientation,
  options?: StyleRecipeOverrides
) {
  return composeStyleProps(
    [
      scrollAreaStyles.thumb,
      orientation === 'vertical' ? scrollAreaStyles.thumbVertical : scrollAreaStyles.thumbHorizontal
    ],
    options
  );
}
