import * as stylex from '@stylexjs/stylex';
import { colors } from './colors.stylex';
import { palette } from './palette.stylex';

export const lightTheme = stylex.createTheme(colors, {});

export const darkTheme = stylex.createTheme(colors, {
  surface: palette.gray900,
  text: palette.gray50,
  textMuted: palette.gray400,
  border: palette.gray400,
  primary: palette.blue500,
  primaryHover: palette.blue400,
  onEmphasis: palette.gray950,
  surfaceDisabled: palette.gray900,
  textDisabled: palette.gray600
});
