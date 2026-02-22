import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const aspectRatioStyles = stylex.create({
  root: {
    display: 'block',
    position: 'relative',
    width: '100%'
  },
  spacer: {
    display: 'block',
    width: '100%'
  },
  content: {
    inset: 0,
    position: 'absolute'
  }
});

export function getAspectRatioRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([aspectRatioStyles.root], options);
}

export function getAspectRatioSpacerStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([aspectRatioStyles.spacer], options);
}

export function getAspectRatioContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([aspectRatioStyles.content], options);
}
