import * as stylex from '@stylexjs/stylex';
import { palette } from './palette.stylex';

export const colors = stylex.defineVars({
  surface: palette.gray50,
  surfaceElevated: palette.white,
  text: palette.gray900,
  textMuted: palette.gray600,
  border: palette.gray600,
  borderMuted: palette.gray400,
  borderDisabled: palette.gray400,
  primary: palette.blue600,
  primaryHover: palette.blue700,
  onEmphasis: palette.gray50,
  surfaceDisabled: palette.gray50,
  textDisabled: palette.gray400
});
