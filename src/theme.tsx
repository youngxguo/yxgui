import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export interface TypographyRole {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing: string;
}

interface ThemeValues {
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

export type ThemeOverrides = DeepPartial<ThemeValues>;

export function createTheme(overrides: ThemeOverrides = {}): ThemeOverrides {
  return overrides;
}

export const lightTheme: ThemeOverrides = createTheme();

export const darkTheme: ThemeOverrides = createTheme({
  color: {
    background: {
      canvas: '#171716',
      surface: '#232321',
      raised: '#32312d',
      subtle: '#2a2926'
    },
    foreground: {
      default: '#f5f4ef',
      muted: '#aaa9a2'
    },
    border: {
      default: '#85847d',
      strong: '#aaa9a2'
    },
    accent: {
      solid: '#9b8cf3',
      solidHover: '#ad9fff',
      solidPressed: '#c0b6ff',
      contrast: '#171326',
      subtle: '#2c264d',
      foreground: '#c0b6ff'
    },
    danger: {
      foreground: '#ffb4ab',
      border: '#f97066',
      subtle: '#3a1d1a'
    },
    focusRing: '#b7acff'
  }
});

type ThemeCSSProperties = CSSProperties & {
  [Variable in `--yxg-${string}`]?: string | number;
};

function themeToCSSProperties(theme: ThemeOverrides): ThemeCSSProperties {
  return {
    '--yxg-color-background-canvas': theme.color?.background?.canvas,
    '--yxg-color-background-surface': theme.color?.background?.surface,
    '--yxg-color-background-raised': theme.color?.background?.raised,
    '--yxg-color-background-subtle': theme.color?.background?.subtle,
    '--yxg-color-foreground-default': theme.color?.foreground?.default,
    '--yxg-color-foreground-muted': theme.color?.foreground?.muted,
    '--yxg-color-border-default': theme.color?.border?.default,
    '--yxg-color-border-strong': theme.color?.border?.strong,
    '--yxg-color-accent-solid': theme.color?.accent?.solid,
    '--yxg-color-accent-solid-hover': theme.color?.accent?.solidHover,
    '--yxg-color-accent-solid-pressed': theme.color?.accent?.solidPressed,
    '--yxg-color-accent-contrast': theme.color?.accent?.contrast,
    '--yxg-color-accent-subtle': theme.color?.accent?.subtle,
    '--yxg-color-accent-foreground': theme.color?.accent?.foreground,
    '--yxg-color-danger-foreground': theme.color?.danger?.foreground,
    '--yxg-color-danger-border': theme.color?.danger?.border,
    '--yxg-color-danger-subtle': theme.color?.danger?.subtle,
    '--yxg-color-focus-ring': theme.color?.focusRing,
    '--yxg-font-body-family': theme.typography?.body?.fontFamily,
    '--yxg-font-body-size': theme.typography?.body?.fontSize,
    '--yxg-font-body-line-height': theme.typography?.body?.lineHeight,
    '--yxg-font-body-weight': theme.typography?.body?.fontWeight,
    '--yxg-font-body-letter-spacing': theme.typography?.body?.letterSpacing,
    '--yxg-font-body-small-family': theme.typography?.bodySmall?.fontFamily,
    '--yxg-font-body-small-size': theme.typography?.bodySmall?.fontSize,
    '--yxg-font-body-small-line-height': theme.typography?.bodySmall?.lineHeight,
    '--yxg-font-body-small-weight': theme.typography?.bodySmall?.fontWeight,
    '--yxg-font-body-small-letter-spacing': theme.typography?.bodySmall?.letterSpacing,
    '--yxg-font-label-family': theme.typography?.label?.fontFamily,
    '--yxg-font-label-size': theme.typography?.label?.fontSize,
    '--yxg-font-label-line-height': theme.typography?.label?.lineHeight,
    '--yxg-font-label-weight': theme.typography?.label?.fontWeight,
    '--yxg-font-label-letter-spacing': theme.typography?.label?.letterSpacing,
    '--yxg-font-heading-family': theme.typography?.heading?.fontFamily,
    '--yxg-font-heading-size': theme.typography?.heading?.fontSize,
    '--yxg-font-heading-line-height': theme.typography?.heading?.lineHeight,
    '--yxg-font-heading-weight': theme.typography?.heading?.fontWeight,
    '--yxg-font-heading-letter-spacing': theme.typography?.heading?.letterSpacing,
    '--yxg-font-code-family': theme.typography?.code?.fontFamily,
    '--yxg-font-code-size': theme.typography?.code?.fontSize,
    '--yxg-font-code-line-height': theme.typography?.code?.lineHeight,
    '--yxg-font-code-weight': theme.typography?.code?.fontWeight,
    '--yxg-font-code-letter-spacing': theme.typography?.code?.letterSpacing,
    '--yxg-control-height': theme.control?.height,
    '--yxg-control-padding-inline': theme.control?.paddingInline,
    '--yxg-control-gap': theme.control?.gap,
    '--yxg-radius-control': theme.radius?.control,
    '--yxg-radius-container': theme.radius?.container,
    '--yxg-radius-full': theme.radius?.full,
    '--yxg-duration-fast': theme.motion?.durationFast,
    '--yxg-ease-standard': theme.motion?.easingStandard,
    '--yxg-opacity-disabled': theme.opacity?.disabled
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
