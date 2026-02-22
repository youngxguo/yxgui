import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps, pickStyle } from '../../styles/recipes';
import { paletteTokens, typographyTokens } from '../../theme/tokens.stylex';

export type LabelSize = 'sm' | 'md';

interface GetLabelStylePropsOptions {
  size: LabelSize;
  className?: string;
  style?: CSSProperties;
}

const labelStyles = stylex.create({
  root: {
    color: paletteTokens.foreground,
    display: 'inline-flex',
    fontFamily: typographyTokens.fontFamily,
    fontWeight: typographyTokens.fontWeightMedium,
    lineHeight: '1.2'
  },
  sm: {
    fontSize: typographyTokens.fontSizeSm
  },
  md: {
    fontSize: typographyTokens.fontSizeMd
  }
});

const labelSizeStyles: Record<LabelSize, unknown> = {
  sm: labelStyles.sm,
  md: labelStyles.md
};

export function getLabelStyleProps({ size, className, style }: GetLabelStylePropsOptions) {
  return composeStyleProps([labelStyles.root, pickStyle(labelSizeStyles, size)], {
    className,
    style
  });
}
