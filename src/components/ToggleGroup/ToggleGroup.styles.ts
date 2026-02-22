import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { radiusTokens, spacingTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const toggleGroupStyles = stylex.create({
  root: {
    display: 'inline-flex',
    gap: spacingTokens.xs,
    alignItems: 'center'
  },
  rootVertical: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  item: {
    borderRadius: radiusTokens.md
  }
});

export type ToggleGroupOrientation = 'horizontal' | 'vertical';

export function getToggleGroupRootStyleProps(
  orientation: ToggleGroupOrientation,
  options?: SlotStyleOptions
) {
  return composeStyleProps(
    [toggleGroupStyles.root, orientation === 'vertical' && toggleGroupStyles.rootVertical],
    options
  );
}

export function getToggleGroupItemStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([toggleGroupStyles.item], options);
}
