export interface PaletteTokens {
  background: string;
  foreground: string;
  border: string;
  accent: string;
  focusRing: string;
  mutedForeground: string;
}

export interface TypographyTokens {
  fontFamily: string;
  fontWeightStrong: number;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  lineHeightTight: number;
}

export interface RadiusTokens {
  sm: string;
  md: string;
  lg: string;
  pill: string;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

export interface SurfaceTokens {
  base: string;
  elevated: string;
  subtle: string;
}

export interface BorderTokens {
  default: string;
  muted: string;
  strong: string;
  focus: string;
}

export interface ControlTokens {
  background: string;
  backgroundDisabled: string;
  foreground: string;
  placeholder: string;
  border: string;
  borderFocus: string;
}

export interface PrimaryVariantTokens {
  background: string;
  foreground: string;
}

export interface SecondaryVariantTokens {
  background: string;
  foreground: string;
  border: string;
  hoverBorder: string;
}

export interface GhostVariantTokens {
  foreground: string;
  hoverBackground: string;
}

export interface OutlineVariantTokens {
  border: string;
  foreground: string;
}

export interface VariantTokens {
  primary: PrimaryVariantTokens;
  secondary: SecondaryVariantTokens;
  ghost: GhostVariantTokens;
  outline: OutlineVariantTokens;
}

export interface ButtonThemeTokens {
  primaryHoverShadow: string;
  disabledOpacity: number;
  activeOffset: string;
  paddingSm: string;
  paddingMd: string;
  paddingLg: string;
  minHeightSm: string;
  minHeightMd: string;
  minHeightLg: string;
}

export interface InputThemeTokens {
  invalidBorder: string;
}

export interface CardThemeTokens {
  shadow: string;
}

export interface ComponentTokens {
  button: ButtonThemeTokens;
  input: InputThemeTokens;
  card: CardThemeTokens;
}

export interface Theme {
  palette: PaletteTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  spacing: SpacingTokens;
  surface: SurfaceTokens;
  border: BorderTokens;
  control: ControlTokens;
  variants: VariantTokens;
  components: ComponentTokens;
}

export type ThemeOptions = {
  [Key in keyof Theme]?: Theme[Key] extends object
    ? {
        [NestedKey in keyof Theme[Key]]?: Theme[Key][NestedKey] extends object
          ? Partial<Theme[Key][NestedKey]>
          : Theme[Key][NestedKey];
      }
    : Theme[Key];
};
