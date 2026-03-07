import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { spacingTokens } from '../../theme/tokens/foundationTokens.stylex';
import { borderTokens } from '../../theme/tokens/semanticTokens.stylex';

export type SeparatorOrientation = 'horizontal' | 'vertical';

interface GetSeparatorStylePropsOptions {
  orientation: SeparatorOrientation;
  className?: string;
  style?: CSSProperties;
}

const separatorStyles = stylex.create({
  root: {
    backgroundColor: borderTokens.muted,
    flexShrink: 0
  },
  horizontal: {
    height: borderTokens.widthThin,
    width: '100%'
  },
  vertical: {
    alignSelf: 'stretch',
    height: '100%',
    minHeight: spacingTokens.xl,
    width: borderTokens.widthThin
  }
});

const orientationStyles: Record<SeparatorOrientation, unknown> = {
  horizontal: separatorStyles.horizontal,
  vertical: separatorStyles.vertical
};

export function getSeparatorStyleProps({
  orientation,
  className,
  style
}: GetSeparatorStylePropsOptions) {
  return composeStyleProps([separatorStyles.root, pickStyle(orientationStyles, orientation)], {
    className,
    style
  });
}
