import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

interface ThemeValues {
  color: {
    canvas: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
    accentHover: string;
    onAccent: string;
    focus: string;
  };
  typography: {
    bodyFontFamily: string;
  };
  control: {
    height: string;
    paddingInline: string;
    radius: string;
  };
  motion: {
    durationFast: string;
    easingStandard: string;
  };
}

export type ThemeOverrides = {
  [Section in keyof ThemeValues]?: Partial<ThemeValues[Section]>;
};

export function createTheme(overrides: ThemeOverrides = {}): ThemeOverrides {
  return overrides;
}

export const lightTheme: ThemeOverrides = createTheme();

export const darkTheme: ThemeOverrides = createTheme({
  color: {
    canvas: '#171716',
    surface: '#232321',
    text: '#f5f4ef',
    textMuted: '#aaa9a2',
    border: '#42413c',
    accent: '#9b8cf3',
    accentHover: '#ad9fff',
    onAccent: '#171326',
    focus: '#b7acff'
  }
});

type ThemeCSSProperties = CSSProperties & {
  [Variable in `--yxg-${string}`]?: string;
};

function themeToCSSProperties(theme: ThemeOverrides): ThemeCSSProperties {
  return {
    '--yxg-color-canvas': theme.color?.canvas,
    '--yxg-color-surface': theme.color?.surface,
    '--yxg-color-text': theme.color?.text,
    '--yxg-color-text-muted': theme.color?.textMuted,
    '--yxg-color-border': theme.color?.border,
    '--yxg-color-accent': theme.color?.accent,
    '--yxg-color-accent-hover': theme.color?.accentHover,
    '--yxg-color-on-accent': theme.color?.onAccent,
    '--yxg-color-focus': theme.color?.focus,
    '--yxg-font-body': theme.typography?.bodyFontFamily,
    '--yxg-control-height': theme.control?.height,
    '--yxg-control-padding-inline': theme.control?.paddingInline,
    '--yxg-radius-control': theme.control?.radius,
    '--yxg-duration-fast': theme.motion?.durationFast,
    '--yxg-ease-standard': theme.motion?.easingStandard
  };
}

export type ThemeProviderProps = ComponentPropsWithoutRef<'div'> & {
  theme: ThemeOverrides;
};

export function ThemeProvider({ theme, style, children, ...props }: ThemeProviderProps) {
  return (
    <div {...props} data-yxgui-theme="" style={{ ...themeToCSSProperties(theme), ...style }}>
      {children}
    </div>
  );
}
