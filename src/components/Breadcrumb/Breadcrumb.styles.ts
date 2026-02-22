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
  linkFocusVisible: {
    ':focus-visible': {
      outlineColor: borderTokens.focus,
      outlineOffset: '2px',
      outlineStyle: 'solid',
      outlineWidth: '2px'
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
    borderWidth: '1px',
    color: paletteTokens.mutedForeground,
    display: 'inline-flex',
    fontSize: typographyTokens.fontSizeXs,
    lineHeight: 1,
    minHeight: '1.25rem',
    padding: '0 0.35rem',
    userSelect: 'none'
  }
});

export function getBreadcrumbRootStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([breadcrumbStyles.root], options);
}

export function getBreadcrumbListStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([breadcrumbStyles.list], options);
}

export function getBreadcrumbItemStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([breadcrumbStyles.item], options);
}

export function getBreadcrumbLinkStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps(
    [breadcrumbStyles.link, breadcrumbStyles.linkHover, breadcrumbStyles.linkFocusVisible],
    options
  );
}

export function getBreadcrumbPageStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([breadcrumbStyles.page], options);
}

export function getBreadcrumbSeparatorStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([breadcrumbStyles.separator], options);
}

export function getBreadcrumbEllipsisStyleProps(options?: SlotStyleOptions) {
  return composeStyleProps([breadcrumbStyles.ellipsis], options);
}
