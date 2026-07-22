import * as stylex from '@stylexjs/stylex';
import { colors } from './tokens.stylex';
import { palette } from './values.stylex';

export const lightTheme = stylex.createTheme(colors, {
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

export const darkTheme = stylex.createTheme(colors, {
  backgroundCanvas: palette.neutral950,
  backgroundSurface: palette.neutral900,
  backgroundRaised: palette.neutral800,
  backgroundSubtle: palette.neutral900,
  foregroundDefault: palette.neutral50,
  foregroundMuted: palette.neutral400,
  borderDefault: palette.neutral800,
  borderStrong: palette.neutral700,
  accentSolid: palette.neutral200,
  accentSolidHover: palette.neutral300,
  accentSolidPressed: palette.neutral400,
  accentContrast: palette.neutral900,
  accentSubtle: palette.neutral800,
  accentForeground: palette.neutral50,
  dangerForeground: palette.red300,
  dangerBorder: palette.red500,
  dangerSubtle: palette.red950,
  focusRing: palette.neutral500
});
