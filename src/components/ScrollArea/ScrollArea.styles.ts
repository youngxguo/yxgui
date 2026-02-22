import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { borderTokens, radiusTokens, surfaceTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const scrollAreaStyles = stylex.create({
  root: {
    border: `1px solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    backgroundColor: surfaceTokens.elevated,
    position: 'relative'
  },
  viewport: {
    overflow: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    outline: 'none'
  },
  scrollbar: {
    backgroundColor: '#efeee7',
    borderRadius: radiusTokens.pill,
    display: 'flex',
    flexShrink: 0,
    userSelect: 'none'
  },
  scrollbarVertical: {
    height: '100%',
    minWidth: '10px',
    padding: '2px',
    position: 'absolute',
    right: '2px',
    top: '2px',
    bottom: '2px'
  },
  scrollbarHorizontal: {
    width: '100%',
    minHeight: '10px',
    padding: '2px',
    position: 'absolute',
    left: '2px',
    right: '2px',
    bottom: '2px'
  },
  thumb: {
    backgroundColor: '#c9c7bc',
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
