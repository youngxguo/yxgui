import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export interface Theme {
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

export type ThemeOptions = {
  [Section in keyof Theme]?: Partial<Theme[Section]>;
};

const defaultTheme: Theme = {
  color: {
    canvas: '#f7f7f4',
    surface: '#ffffff',
    text: '#20201e',
    textMuted: '#66655f',
    border: '#d9d8d1',
    accent: '#5b47d6',
    accentHover: '#4936bd',
    onAccent: '#ffffff',
    focus: '#7969e8'
  },
  typography: {
    bodyFontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  control: {
    height: '2.75rem',
    paddingInline: '1rem',
    radius: '0.75rem'
  },
  motion: {
    durationFast: '140ms',
    easingStandard: 'cubic-bezier(0.2, 0, 0, 1)'
  }
};

export function createTheme(options: ThemeOptions = {}): Theme {
  return {
    color: { ...defaultTheme.color, ...options.color },
    typography: { ...defaultTheme.typography, ...options.typography },
    control: { ...defaultTheme.control, ...options.control },
    motion: { ...defaultTheme.motion, ...options.motion }
  };
}

export const lightTheme: Theme = createTheme();

export const darkTheme: Theme = createTheme({
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

function themeToCSSProperties(theme: Theme): ThemeCSSProperties {
  return {
    '--yxg-color-canvas': theme.color.canvas,
    '--yxg-color-surface': theme.color.surface,
    '--yxg-color-text': theme.color.text,
    '--yxg-color-text-muted': theme.color.textMuted,
    '--yxg-color-border': theme.color.border,
    '--yxg-color-accent': theme.color.accent,
    '--yxg-color-accent-hover': theme.color.accentHover,
    '--yxg-color-on-accent': theme.color.onAccent,
    '--yxg-color-focus': theme.color.focus,
    '--yxg-font-body': theme.typography.bodyFontFamily,
    '--yxg-control-height': theme.control.height,
    '--yxg-control-padding-inline': theme.control.paddingInline,
    '--yxg-radius-control': theme.control.radius,
    '--yxg-duration-fast': theme.motion.durationFast,
    '--yxg-ease-standard': theme.motion.easingStandard
  };
}

export type ThemeProviderProps = ComponentPropsWithoutRef<'div'> & {
  theme: Theme;
};

export function ThemeProvider({ theme, style, children, ...props }: ThemeProviderProps) {
  return (
    <div {...props} data-yxgui-theme="" style={{ ...themeToCSSProperties(theme), ...style }}>
      {children}
    </div>
  );
}
