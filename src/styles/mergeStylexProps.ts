import type { CSSProperties } from 'react';
import type * as stylex from '@stylexjs/stylex';

export type StylexDOMProps = ReturnType<typeof stylex.props>;

export interface StylePropOverrides {
  className?: string;
  style?: CSSProperties;
}

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
