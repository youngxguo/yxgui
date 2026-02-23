import * as stylex from '@stylexjs/stylex';
import { composeStyleProps, type StyleRecipeOverrides } from '../../styles/recipes';
import {
  borderTokens,
  paletteTokens,
  spacingTokens,
  surfaceTokens,
  typographyTokens
} from '../../theme/tokens.stylex';

const tableStyles = stylex.create({
  root: {
    borderCollapse: 'collapse',
    color: paletteTokens.foreground,
    fontFamily: typographyTokens.fontFamily,
    width: '100%'
  },
  header: {
    backgroundColor: surfaceTokens.base
  },
  body: {},
  footer: {
    backgroundColor: surfaceTokens.subtle,
    fontWeight: typographyTokens.fontWeightMedium
  },
  row: {
    textAlign: 'left'
  },
  headCell: {
    borderBottomColor: borderTokens.default,
    borderBottomStyle: 'solid',
    borderBottomWidth: borderTokens.widthThin,
    color: paletteTokens.foreground,
    fontSize: typographyTokens.fontSizeSm,
    fontWeight: typographyTokens.fontWeightStrong,
    lineHeight: typographyTokens.lineHeightNormal,
    padding: `${spacingTokens.md} ${spacingTokens.xl}`,
    textAlign: 'left',
    verticalAlign: 'middle'
  },
  cell: {
    borderBottomColor: borderTokens.muted,
    borderBottomStyle: 'solid',
    borderBottomWidth: borderTokens.widthThin,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightNormal,
    padding: `${spacingTokens.md} ${spacingTokens.xl}`,
    verticalAlign: 'middle'
  },
  caption: {
    captionSide: 'bottom',
    color: paletteTokens.mutedForeground,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightNormal,
    paddingTop: spacingTokens.md,
    textAlign: 'left'
  }
});

export function getTableRootStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tableStyles.root], options);
}

export function getTableHeaderStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tableStyles.header], options);
}

export function getTableBodyStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tableStyles.body], options);
}

export function getTableFooterStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tableStyles.footer], options);
}

export function getTableRowStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tableStyles.row], options);
}

export function getTableHeadCellStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tableStyles.headCell], options);
}

export function getTableCellStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tableStyles.cell], options);
}

export function getTableCaptionStyleProps(options?: StyleRecipeOverrides) {
  return composeStyleProps([tableStyles.caption], options);
}
