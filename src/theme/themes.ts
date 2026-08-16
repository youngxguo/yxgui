import * as stylex from '@stylexjs/stylex';
import { colors } from './colors.stylex';
import { palette } from './palette.stylex';

export const lightTheme = stylex.createTheme(colors, {});

export const darkTheme = stylex.createTheme(colors, {
  surface: palette.gray900,
  surfaceElevated: palette.gray800,
  surfaceSubtle: palette.gray700,
  text: palette.gray50,
  textMuted: palette.gray400,
  border: palette.gray400,
  borderMuted: palette.gray600,
  borderDisabled: palette.gray600,
  primary: palette.blue500,
  primaryHover: palette.blue400,
  info: palette.blue400,
  success: palette.green400,
  warning: palette.amber400,
  danger: palette.red400,
  dangerHover: palette.red600,
  controlThumb: palette.white,
  onEmphasis: palette.gray950,
  surfaceDisabled: palette.gray900,
  textDisabled: palette.gray600
});
