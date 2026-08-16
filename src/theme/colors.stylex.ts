import * as stylex from '@stylexjs/stylex';
import { palette } from './palette.stylex';

export const colors = stylex.defineVars({
  surface: palette.gray50,
  surfaceElevated: palette.white,
  surfaceSubtle: palette.gray100,
  text: palette.gray900,
  textMuted: palette.gray600,
  border: palette.gray600,
  borderMuted: palette.gray400,
  borderDisabled: palette.gray400,
  primary: palette.blue600,
  primaryHover: palette.blue700,
  info: palette.blue600,
  success: palette.green600,
  warning: palette.amber700,
  danger: palette.red600,
  controlThumb: palette.white,
  onEmphasis: palette.gray50,
  surfaceDisabled: palette.gray50,
  textDisabled: palette.gray400
});
