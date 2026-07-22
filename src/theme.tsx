import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export interface TypographyRole {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing: string;
}

export interface Theme {
  color: {
    background: {
      canvas: string;
      surface: string;
      raised: string;
      subtle: string;
    };
    foreground: {
      default: string;
      muted: string;
    };
    border: {
      default: string;
      strong: string;
    };
    accent: {
      solid: string;
      solidHover: string;
      solidPressed: string;
      contrast: string;
      subtle: string;
      foreground: string;
    };
    danger: {
      foreground: string;
      border: string;
      subtle: string;
    };
    focusRing: string;
  };
  typography: {
    body: TypographyRole;
    bodySmall: TypographyRole;
    label: TypographyRole;
    heading: TypographyRole;
    code: TypographyRole;
  };
  control: {
    height: string;
    paddingInline: string;
    gap: string;
  };
  radius: {
    control: string;
    container: string;
    full: string;
  };
  motion: {
    durationFast: string;
    easingStandard: string;
  };
  opacity: {
    disabled: string;
  };
}

type DeepPartial<Value> = {
  [Key in keyof Value]?: Value[Key] extends object ? DeepPartial<Value[Key]> : Value[Key];
};

export type ThemeOverrides = DeepPartial<Theme>;

const sans =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const defaultTheme = {
  color: {
    background: {
      canvas: '#ffffff',
      surface: '#ffffff',
      raised: '#ffffff',
      subtle: '#f5f5f5'
    },
    foreground: {
      default: '#0a0a0a',
      muted: '#737373'
    },
    border: {
      default: '#e5e5e5',
      strong: '#d4d4d4'
    },
    accent: {
      solid: '#171717',
      solidHover: '#262626',
      solidPressed: '#404040',
      contrast: '#fafafa',
      subtle: '#f5f5f5',
      foreground: '#171717'
    },
    danger: {
      foreground: '#b91c1c',
      border: '#ef4444',
      subtle: '#fef2f2'
    },
    focusRing: '#737373'
  },
  typography: {
    body: {
      fontFamily: sans,
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 400,
      letterSpacing: '0'
    },
    bodySmall: {
      fontFamily: sans,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 400,
      letterSpacing: '0'
    },
    label: {
      fontFamily: sans,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 600,
      letterSpacing: '0'
    },
    heading: {
      fontFamily: sans,
      fontSize: '1.5rem',
      lineHeight: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.015em'
    },
    code: {
      fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, ui-monospace, monospace',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 400,
      letterSpacing: '0'
    }
  },
  control: {
    height: '2.25rem',
    paddingInline: '1rem',
    gap: '0.5rem'
  },
  radius: {
    control: '0.375rem',
    container: '0.5rem',
    full: '9999px'
  },
  motion: {
    durationFast: '140ms',
    easingStandard: 'cubic-bezier(0.2, 0, 0, 1)'
  },
  opacity: {
    disabled: '0.5'
  }
} satisfies Theme;

export function createTheme(overrides: ThemeOverrides = {}): Theme {
  return {
    color: {
      background: { ...defaultTheme.color.background, ...overrides.color?.background },
      foreground: { ...defaultTheme.color.foreground, ...overrides.color?.foreground },
      border: { ...defaultTheme.color.border, ...overrides.color?.border },
      accent: { ...defaultTheme.color.accent, ...overrides.color?.accent },
      danger: { ...defaultTheme.color.danger, ...overrides.color?.danger },
      focusRing: overrides.color?.focusRing ?? defaultTheme.color.focusRing
    },
    typography: {
      body: { ...defaultTheme.typography.body, ...overrides.typography?.body },
      bodySmall: { ...defaultTheme.typography.bodySmall, ...overrides.typography?.bodySmall },
      label: { ...defaultTheme.typography.label, ...overrides.typography?.label },
      heading: { ...defaultTheme.typography.heading, ...overrides.typography?.heading },
      code: { ...defaultTheme.typography.code, ...overrides.typography?.code }
    },
    control: { ...defaultTheme.control, ...overrides.control },
    radius: { ...defaultTheme.radius, ...overrides.radius },
    motion: { ...defaultTheme.motion, ...overrides.motion },
    opacity: { ...defaultTheme.opacity, ...overrides.opacity }
  };
}

export const darkTheme = createTheme({
  color: {
    background: {
      canvas: '#0a0a0a',
      surface: '#171717',
      raised: '#262626',
      subtle: '#171717'
    },
    foreground: {
      default: '#fafafa',
      muted: '#a3a3a3'
    },
    border: {
      default: '#262626',
      strong: '#404040'
    },
    accent: {
      solid: '#e5e5e5',
      solidHover: '#d4d4d4',
      solidPressed: '#a3a3a3',
      contrast: '#171717',
      subtle: '#262626',
      foreground: '#fafafa'
    },
    danger: {
      foreground: '#fca5a5',
      border: '#ef4444',
      subtle: '#450a0a'
    },
    focusRing: '#737373'
  }
});

type ThemeCSSProperties = CSSProperties & {
  [Variable in `--yxg-${string}`]?: string | number;
};

function themeToCSSProperties(theme: Theme): ThemeCSSProperties {
  return {
    '--yxg-color-background-canvas': theme.color.background.canvas,
    '--yxg-color-background-surface': theme.color.background.surface,
    '--yxg-color-background-raised': theme.color.background.raised,
    '--yxg-color-background-subtle': theme.color.background.subtle,
    '--yxg-color-foreground-default': theme.color.foreground.default,
    '--yxg-color-foreground-muted': theme.color.foreground.muted,
    '--yxg-color-border-default': theme.color.border.default,
    '--yxg-color-border-strong': theme.color.border.strong,
    '--yxg-color-accent-solid': theme.color.accent.solid,
    '--yxg-color-accent-solid-hover': theme.color.accent.solidHover,
    '--yxg-color-accent-solid-pressed': theme.color.accent.solidPressed,
    '--yxg-color-accent-contrast': theme.color.accent.contrast,
    '--yxg-color-accent-subtle': theme.color.accent.subtle,
    '--yxg-color-accent-foreground': theme.color.accent.foreground,
    '--yxg-color-danger-foreground': theme.color.danger.foreground,
    '--yxg-color-danger-border': theme.color.danger.border,
    '--yxg-color-danger-subtle': theme.color.danger.subtle,
    '--yxg-color-focus-ring': theme.color.focusRing,
    '--yxg-font-body-family': theme.typography.body.fontFamily,
    '--yxg-font-body-size': theme.typography.body.fontSize,
    '--yxg-font-body-line-height': theme.typography.body.lineHeight,
    '--yxg-font-body-weight': theme.typography.body.fontWeight,
    '--yxg-font-body-letter-spacing': theme.typography.body.letterSpacing,
    '--yxg-font-body-small-family': theme.typography.bodySmall.fontFamily,
    '--yxg-font-body-small-size': theme.typography.bodySmall.fontSize,
    '--yxg-font-body-small-line-height': theme.typography.bodySmall.lineHeight,
    '--yxg-font-body-small-weight': theme.typography.bodySmall.fontWeight,
    '--yxg-font-body-small-letter-spacing': theme.typography.bodySmall.letterSpacing,
    '--yxg-font-label-family': theme.typography.label.fontFamily,
    '--yxg-font-label-size': theme.typography.label.fontSize,
    '--yxg-font-label-line-height': theme.typography.label.lineHeight,
    '--yxg-font-label-weight': theme.typography.label.fontWeight,
    '--yxg-font-label-letter-spacing': theme.typography.label.letterSpacing,
    '--yxg-font-heading-family': theme.typography.heading.fontFamily,
    '--yxg-font-heading-size': theme.typography.heading.fontSize,
    '--yxg-font-heading-line-height': theme.typography.heading.lineHeight,
    '--yxg-font-heading-weight': theme.typography.heading.fontWeight,
    '--yxg-font-heading-letter-spacing': theme.typography.heading.letterSpacing,
    '--yxg-font-code-family': theme.typography.code.fontFamily,
    '--yxg-font-code-size': theme.typography.code.fontSize,
    '--yxg-font-code-line-height': theme.typography.code.lineHeight,
    '--yxg-font-code-weight': theme.typography.code.fontWeight,
    '--yxg-font-code-letter-spacing': theme.typography.code.letterSpacing,
    '--yxg-control-height': theme.control.height,
    '--yxg-control-padding-inline': theme.control.paddingInline,
    '--yxg-control-gap': theme.control.gap,
    '--yxg-radius-control': theme.radius.control,
    '--yxg-radius-container': theme.radius.container,
    '--yxg-radius-full': theme.radius.full,
    '--yxg-duration-fast': theme.motion.durationFast,
    '--yxg-ease-standard': theme.motion.easingStandard,
    '--yxg-opacity-disabled': theme.opacity.disabled
  };
}

export type ThemeProviderProps = ComponentPropsWithoutRef<'div'> & {
  theme?: Theme;
};

export function ThemeProvider({
  theme = defaultTheme,
  style,
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <div {...props} data-yxgui-theme="" style={{ ...themeToCSSProperties(theme), ...style }}>
      {children}
    </div>
  );
}
