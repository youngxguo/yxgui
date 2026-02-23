import type { CSSProperties } from 'react';
import type * as stylex from '@stylexjs/stylex';

/** Normalized DOM props returned by `stylex.props(...)`. */
export type StylexDOMProps = ReturnType<typeof stylex.props>;

export interface StylePropOverrides {
  /** Allows callers to attach extra selectors without replacing StyleX classes. */
  className?: string;
  /** Applied after StyleX inline styles so consumer values take precedence. */
  style?: CSSProperties;
}

/**
 * Merges StyleX-generated DOM props with component-level `className` and `style` overrides.
 */
export function mergeStylexProps(
  stylexProps: StylexDOMProps,
  { className, style }: StylePropOverrides = {}
): StylexDOMProps {
  const mergedClassName = [stylexProps.className, className].filter(Boolean).join(' ');
  const existingStyle = stylexProps.style as CSSProperties | undefined;
  const mergedStyle =
    existingStyle != null || style != null ? { ...existingStyle, ...style } : undefined;

  return {
    ...stylexProps,
    className: mergedClassName || undefined,
    style: mergedStyle
  };
}
