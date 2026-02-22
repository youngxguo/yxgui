import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import { radiusTokens, spacingTokens, typographyTokens } from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const tooltipStyles = stylex.create({
  content: {
    backgroundColor: '#161614',
    borderRadius: radiusTokens.sm,
    boxShadow: '0 6px 16px rgba(0,0,0,0.22)',
    color: '#fcfcf9',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: '1.2',
    maxWidth: '16rem',
    padding: `${spacingTokens.xs} ${spacingTokens.sm}`,
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: 1000
  },
  triggerWrap: {
    display: 'inline-flex'
  }
});

export function getTooltipContentStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([tooltipStyles.content], options);
}

export function getTooltipTriggerWrapStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([tooltipStyles.triggerWrap], options);
}
