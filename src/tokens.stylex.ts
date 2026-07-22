import * as stylex from '@stylexjs/stylex';
import {
  controlValues,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  palette,
  radiusValues
} from './values.stylex';

export const colors = stylex.defineVars({
  backgroundCanvas: palette.white,
  backgroundSurface: palette.white,
  backgroundRaised: palette.white,
  backgroundSubtle: palette.neutral100,
  foregroundDefault: palette.neutral950,
  foregroundMuted: palette.neutral500,
  borderDefault: palette.neutral200,
  borderStrong: palette.neutral300,
  accentSolid: palette.neutral900,
  accentSolidHover: palette.neutral800,
  accentSolidPressed: palette.neutral700,
  accentContrast: palette.neutral50,
  accentSubtle: palette.neutral100,
  accentForeground: palette.neutral900,
  dangerForeground: palette.red700,
  dangerBorder: palette.red500,
  dangerSubtle: palette.red50,
  focusRing: palette.neutral500
});

export const typography = stylex.defineVars({
  bodyFamily: fontFamilies.sans,
  bodySize: fontSizes.body,
  bodyLineHeight: lineHeights.body,
  bodyWeight: fontWeights.regular,
  bodyLetterSpacing: letterSpacings.default,
  bodySmallFamily: fontFamilies.sans,
  bodySmallSize: fontSizes.small,
  bodySmallLineHeight: lineHeights.small,
  bodySmallWeight: fontWeights.regular,
  bodySmallLetterSpacing: letterSpacings.default,
  labelFamily: fontFamilies.sans,
  labelSize: fontSizes.small,
  labelLineHeight: lineHeights.small,
  labelWeight: fontWeights.semibold,
  labelLetterSpacing: letterSpacings.default,
  headingFamily: fontFamilies.sans,
  headingSize: fontSizes.heading,
  headingLineHeight: lineHeights.heading,
  headingWeight: fontWeights.bold,
  headingLetterSpacing: letterSpacings.heading,
  codeFamily: fontFamilies.mono,
  codeSize: fontSizes.small,
  codeLineHeight: lineHeights.small,
  codeWeight: fontWeights.regular,
  codeLetterSpacing: letterSpacings.default
});

export const control = stylex.defineVars({
  height: controlValues.height,
  paddingInline: controlValues.paddingInline,
  gap: controlValues.gap
});

export const radii = stylex.defineVars({
  control: radiusValues.control,
  container: radiusValues.container,
  full: radiusValues.full
});
