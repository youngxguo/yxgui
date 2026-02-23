import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import { uiPrimitives } from '../../styles/primitives';
import {
  borderTokens,
  paletteTokens,
  radiusTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

const breadcrumbStyles = stylex.create({
  root: {
    display: 'block',
    width: '100%'
  },
  list: {
    alignItems: 'center',
    color: paletteTokens.mutedForeground,
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: typographyTokens.fontFamily,
    fontSize: typographyTokens.fontSizeSm,
    gap: spacingTokens.sm,
    lineHeight: '1.3',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  item: {
    alignItems: 'center',
    display: 'inline-flex',
    minWidth: 0
  },
  link: {
    borderRadius: radiusTokens.sm,
    color: paletteTokens.mutedForeground,
    outline: 'none',
    textDecoration: 'none'
  },
  linkHover: {
    ':hover': {
      color: paletteTokens.foreground,
      textDecoration: 'underline'
    }
  },
  page: {
    color: paletteTokens.foreground,
    fontWeight: typographyTokens.fontWeightMedium
  },
  separator: {
    alignItems: 'center',
    color: paletteTokens.mutedForeground,
    display: 'inline-flex',
    userSelect: 'none'
  },
  ellipsis: {
    alignItems: 'center',
    backgroundColor: surfaceTokens.subtle,
    borderColor: borderTokens.muted,
    borderRadius: radiusTokens.pill,
    borderStyle: 'solid',
    borderWidth: borderTokens.widthThin,
    color: paletteTokens.mutedForeground,
    display: 'inline-flex',
    fontSize: typographyTokens.fontSizeXs,
    lineHeight: 1,
    minHeight: spacingTokens.xl,
    padding: `0 ${spacingTokens.xs}`,
    userSelect: 'none'
  }
});

export function getBreadcrumbRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([breadcrumbStyles.root], options);
}

export function getBreadcrumbListStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([breadcrumbStyles.list], options);
}

export function getBreadcrumbItemStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([breadcrumbStyles.item], options);
}

export function getBreadcrumbLinkStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps(
    [breadcrumbStyles.link, breadcrumbStyles.linkHover, uiPrimitives.focusVisibleOutline],
    options
  );
}

export function getBreadcrumbPageStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([breadcrumbStyles.page], options);
}

export function getBreadcrumbSeparatorStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([breadcrumbStyles.separator], options);
}

export function getBreadcrumbEllipsisStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([breadcrumbStyles.ellipsis], options);
}
