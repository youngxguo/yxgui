import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { mergeStylexProps, type StylexDOMProps } from './mergeStylexProps';

export interface StyleRecipeOverrides {
  /** Consumer escape hatch for targeting recipe output with custom classes. */
  className?: string;
  /** Last-write-wins inline overrides for one-off visual adjustments. */
  style?: CSSProperties;
}

/**
 * Typed helper for selecting a style variant while preserving the variant key union.
 */
export function pickStyle<Key extends string, Style>(
  stylesByKey: Record<Key, Style>,
  key: Key
): Style {
  return stylesByKey[key];
}

/**
 * Builds DOM props from StyleX styles and merges consumer `className` / `style` overrides.
 */
export function composeStyleProps(
  styles: ReadonlyArray<unknown>,
  overrides?: StyleRecipeOverrides
): StylexDOMProps {
  const stylexProps = (stylex.props as (...args: ReadonlyArray<unknown>) => StylexDOMProps)(
    ...styles
  );
  return mergeStylexProps(stylexProps, overrides);
}
