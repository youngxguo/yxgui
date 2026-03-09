import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { radiusTokens, spacingTokens } from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens, surfaceTokens } from '../../theme/tokens/semanticTokens.stylex';

const scrollAreaStyles = stylex.create({
  root: {
    border: `${borderTokens.widthThin} solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    backgroundColor: surfaceTokens.base,
    overflow: 'hidden'
  },
  viewport: {
    overflow: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    outline: 'none',
    scrollbarWidth: 'thin',
    scrollbarColor: `${surfaceTokens.softStrong} ${surfaceTokens.softHover}`,
    '::-webkit-scrollbar': {
      width: spacingTokens.sm,
      height: spacingTokens.sm
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: surfaceTokens.softHover,
      borderRadius: radiusTokens.pill
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: surfaceTokens.softStrong,
      borderRadius: radiusTokens.pill
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
    width: spacingTokens.sm,
    padding: spacingTokens.xxxs
  },
  scrollbarHorizontal: {
    height: spacingTokens.sm,
    padding: spacingTokens.xxxs
  },
  thumb: {
    backgroundColor: surfaceTokens.softStrong,
    borderRadius: radiusTokens.pill,
    display: 'block'
  },
  thumbVertical: {
    width: '100%',
    minHeight: spacingTokens.sm
  },
  thumbHorizontal: {
    height: '100%',
    minWidth: spacingTokens.sm
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
