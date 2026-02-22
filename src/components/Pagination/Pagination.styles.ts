import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';
import { composeStyleProps } from '../../styles/recipes';
import {
  borderTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

interface SlotStyleOptions {
  className?: string;
  style?: CSSProperties;
}

const paginationStyles = stylex.create({
  nav: {
    display: 'block'
  },
  list: {
    display: 'flex',
    gap: spacingTokens.xs,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center'
  },
  item: {
    display: 'inline-flex'
  },
  link: {
    alignItems: 'center',
    backgroundColor: surfaceTokens.base,
    border: `${borderTokens.widthThin} solid ${borderTokens.default}`,
    borderRadius: radiusTokens.md,
    color: paletteTokens.foreground,
    display: 'inline-flex',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    justifyContent: 'center',
    minHeight: spacingTokens.xxxl,
    minWidth: spacingTokens.xxxl,
    padding: `0 ${spacingTokens.sm}`,
    textDecoration: 'none'
  },
  linkHover: {
    ':hover': {
      backgroundColor: surfaceTokens.subtle
    }
  },
  active: {
    backgroundColor: surfaceTokens.accentMuted,
    borderColor: borderTokens.focus,
    color: paletteTokens.foreground,
    fontWeight: typographyTokens.fontWeightMedium
  },
  disabled: {
    color: paletteTokens.mutedForeground,
    cursor: 'not-allowed',
    opacity: 0.6,
    pointerEvents: 'none'
  },
  ellipsis: {
    color: paletteTokens.mutedForeground,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    padding: `0 ${spacingTokens.sm}`
  }
});

export function getPaginationNavStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([paginationStyles.nav], options);
}

export function getPaginationListStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([paginationStyles.list], options);
}

export function getPaginationItemStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([paginationStyles.item], options);
}

export function getPaginationLinkStyleProps(
  isActive: boolean,
  disabled: boolean,
  options?: SlotStyleOptions
) {
  return composeStyleProps(
    [
      paginationStyles.link,
      !disabled && paginationStyles.linkHover,
      isActive && paginationStyles.active,
      disabled && paginationStyles.disabled
    ],
    options
  );
}

export function getPaginationEllipsisStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([paginationStyles.ellipsis], options);
}
