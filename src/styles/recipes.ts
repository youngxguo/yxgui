import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { mergeStylexProps, type StylexDOMProps } from './mergeStylexProps';

export interface StyleRecipeOverrides {
  className?: string;
  style?: CSSProperties;
}

export function pickStyle<Key extends string, Style>(
  stylesByKey: Record<Key, Style>,
  key: Key
): Style {
  return stylesByKey[key];
}

export function composeStyleProps(
  styles: ReadonlyArray<unknown>,
  overrides?: StyleRecipeOverrides
): StylexDOMProps {
  const stylexProps = (stylex.props as (...args: ReadonlyArray<unknown>) => StylexDOMProps)(
    ...styles
  );
  return mergeStylexProps(stylexProps, overrides);
}
