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
  pill: string;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

export interface ButtonThemeTokens {
  primaryBackground: string;
  primaryForeground: string;
  primaryHoverShadow: string;
  secondaryBackground: string;
  secondaryForeground: string;
  secondaryBorder: string;
  secondaryHoverBorder: string;
  ghostForeground: string;
  ghostHoverBackground: string;
  disabledOpacity: number;
  activeOffset: string;
  paddingSm: string;
  paddingMd: string;
  paddingLg: string;
  minHeightSm: string;
  minHeightMd: string;
  minHeightLg: string;
}

export interface ComponentTokens {
  button: ButtonThemeTokens;
}

export interface Theme {
  palette: PaletteTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  spacing: SpacingTokens;
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
