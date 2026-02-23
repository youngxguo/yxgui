import * as stylex from '@stylexjs/stylex';
import { getButtonLikeStyleProps } from '../../styles/buttonLike';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  borderTokens,
  colorTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

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
  linkAdjustments: {
    minWidth: spacingTokens.xxxl,
    padding: `0 ${spacingTokens.sm}`,
    textDecoration: 'none'
  },
  linkHover: {
    ':hover': {
      backgroundColor: surfaceTokens.subtle
    }
  },
  noActiveTransform: {
    ':active': {
      transform: 'none'
    }
  },
  active: {
    backgroundColor: surfaceTokens.accentMuted,
    borderColor: borderTokens.focus,
    color: colorTokens.foreground,
    fontWeight: typographyTokens.fontWeightMedium
  },
  disabled: {
    color: colorTokens.mutedForeground,
    cursor: 'not-allowed',
    opacity: 0.6,
    pointerEvents: 'none'
  },
  ellipsis: {
    color: colorTokens.mutedForeground,
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    padding: `0 ${spacingTokens.sm}`
  }
});

export function getPaginationNavStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([paginationStyles.nav], options);
}

export function getPaginationListStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([paginationStyles.list], options);
}

export function getPaginationItemStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([paginationStyles.item], options);
}

export function getPaginationLinkStyleProps(
  isActive: boolean,
  disabled: boolean,
  options?: StyleRecipeOverrides
) {
  return getButtonLikeStyleProps({
    variant: 'secondary',
    size: 'sm',
    extraStyles: [
      paginationStyles.linkAdjustments,
      paginationStyles.noActiveTransform,
      !disabled && paginationStyles.linkHover,
      isActive && paginationStyles.active,
      disabled && paginationStyles.disabled
    ],
    className: options?.className,
    style: options?.style
  });
}

export function getPaginationEllipsisStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([paginationStyles.ellipsis], options);
}
