type CSSVariableName = `--yxgui-${string}`;

type LeafValues<T> = T extends string ? T : { [K in keyof T]: LeafValues<T[K]> }[keyof T];

type CSSVariableRefs<T> = {
  readonly [K in keyof T]: T[K] extends CSSVariableName ? `var(${T[K]})` : CSSVariableRefs<T[K]>;
};

export const cssVarNames = {
  palette: {
    background: '--yxgui-palette-background',
    foreground: '--yxgui-palette-foreground',
    border: '--yxgui-palette-border',
    accent: '--yxgui-palette-accent',
    focusRing: '--yxgui-palette-focus-ring',
    mutedForeground: '--yxgui-palette-muted-foreground'
  },
  typography: {
    fontFamily: '--yxgui-typography-font-family',
    fontWeightStrong: '--yxgui-typography-font-weight-strong',
    fontSizeSm: '--yxgui-typography-font-size-sm',
    fontSizeMd: '--yxgui-typography-font-size-md',
    fontSizeLg: '--yxgui-typography-font-size-lg',
    lineHeightTight: '--yxgui-typography-line-height-tight'
  },
  radius: {
    sm: '--yxgui-radius-sm',
    md: '--yxgui-radius-md',
    lg: '--yxgui-radius-lg',
    pill: '--yxgui-radius-pill'
  },
  spacing: {
    xs: '--yxgui-spacing-xs',
    sm: '--yxgui-spacing-sm',
    md: '--yxgui-spacing-md',
    lg: '--yxgui-spacing-lg'
  },
  surface: {
    base: '--yxgui-surface-base',
    elevated: '--yxgui-surface-elevated',
    subtle: '--yxgui-surface-subtle'
  },
  border: {
    default: '--yxgui-border-default',
    muted: '--yxgui-border-muted',
    strong: '--yxgui-border-strong',
    focus: '--yxgui-border-focus'
  },
  control: {
    background: '--yxgui-control-background',
    backgroundDisabled: '--yxgui-control-background-disabled',
    foreground: '--yxgui-control-foreground',
    placeholder: '--yxgui-control-placeholder',
    border: '--yxgui-control-border',
    borderFocus: '--yxgui-control-border-focus'
  },
  variants: {
    primary: {
      background: '--yxgui-variants-primary-background',
      foreground: '--yxgui-variants-primary-foreground'
    },
    secondary: {
      background: '--yxgui-variants-secondary-background',
      foreground: '--yxgui-variants-secondary-foreground',
      border: '--yxgui-variants-secondary-border',
      hoverBorder: '--yxgui-variants-secondary-hover-border'
    },
    ghost: {
      foreground: '--yxgui-variants-ghost-foreground',
      hoverBackground: '--yxgui-variants-ghost-hover-background'
    },
    outline: {
      border: '--yxgui-variants-outline-border',
      foreground: '--yxgui-variants-outline-foreground'
    }
  },
  components: {
    button: {
      primaryHoverShadow: '--yxgui-components-button-primary-hover-shadow',
      disabledOpacity: '--yxgui-components-button-disabled-opacity',
      activeOffset: '--yxgui-components-button-active-offset',
      paddingSm: '--yxgui-components-button-padding-sm',
      paddingMd: '--yxgui-components-button-padding-md',
      paddingLg: '--yxgui-components-button-padding-lg',
      minHeightSm: '--yxgui-components-button-min-height-sm',
      minHeightMd: '--yxgui-components-button-min-height-md',
      minHeightLg: '--yxgui-components-button-min-height-lg'
    },
    input: {
      invalidBorder: '--yxgui-components-input-invalid-border'
    },
    card: {
      shadow: '--yxgui-components-card-shadow'
    }
  }
} as const;

export const cssVarRefs = {
  palette: {
    background: `var(${cssVarNames.palette.background})`,
    foreground: `var(${cssVarNames.palette.foreground})`,
    border: `var(${cssVarNames.palette.border})`,
    accent: `var(${cssVarNames.palette.accent})`,
    focusRing: `var(${cssVarNames.palette.focusRing})`,
    mutedForeground: `var(${cssVarNames.palette.mutedForeground})`
  },
  typography: {
    fontFamily: `var(${cssVarNames.typography.fontFamily})`,
    fontWeightStrong: `var(${cssVarNames.typography.fontWeightStrong})`,
    fontSizeSm: `var(${cssVarNames.typography.fontSizeSm})`,
    fontSizeMd: `var(${cssVarNames.typography.fontSizeMd})`,
    fontSizeLg: `var(${cssVarNames.typography.fontSizeLg})`,
    lineHeightTight: `var(${cssVarNames.typography.lineHeightTight})`
  },
  radius: {
    sm: `var(${cssVarNames.radius.sm})`,
    md: `var(${cssVarNames.radius.md})`,
    lg: `var(${cssVarNames.radius.lg})`,
    pill: `var(${cssVarNames.radius.pill})`
  },
  spacing: {
    xs: `var(${cssVarNames.spacing.xs})`,
    sm: `var(${cssVarNames.spacing.sm})`,
    md: `var(${cssVarNames.spacing.md})`,
    lg: `var(${cssVarNames.spacing.lg})`
  },
  surface: {
    base: `var(${cssVarNames.surface.base})`,
    elevated: `var(${cssVarNames.surface.elevated})`,
    subtle: `var(${cssVarNames.surface.subtle})`
  },
  border: {
    default: `var(${cssVarNames.border.default})`,
    muted: `var(${cssVarNames.border.muted})`,
    strong: `var(${cssVarNames.border.strong})`,
    focus: `var(${cssVarNames.border.focus})`
  },
  control: {
    background: `var(${cssVarNames.control.background})`,
    backgroundDisabled: `var(${cssVarNames.control.backgroundDisabled})`,
    foreground: `var(${cssVarNames.control.foreground})`,
    placeholder: `var(${cssVarNames.control.placeholder})`,
    border: `var(${cssVarNames.control.border})`,
    borderFocus: `var(${cssVarNames.control.borderFocus})`
  },
  variants: {
    primary: {
      background: `var(${cssVarNames.variants.primary.background})`,
      foreground: `var(${cssVarNames.variants.primary.foreground})`
    },
    secondary: {
      background: `var(${cssVarNames.variants.secondary.background})`,
      foreground: `var(${cssVarNames.variants.secondary.foreground})`,
      border: `var(${cssVarNames.variants.secondary.border})`,
      hoverBorder: `var(${cssVarNames.variants.secondary.hoverBorder})`
    },
    ghost: {
      foreground: `var(${cssVarNames.variants.ghost.foreground})`,
      hoverBackground: `var(${cssVarNames.variants.ghost.hoverBackground})`
    },
    outline: {
      border: `var(${cssVarNames.variants.outline.border})`,
      foreground: `var(${cssVarNames.variants.outline.foreground})`
    }
  },
  components: {
    button: {
      primaryHoverShadow: `var(${cssVarNames.components.button.primaryHoverShadow})`,
      disabledOpacity: `var(${cssVarNames.components.button.disabledOpacity})`,
      activeOffset: `var(${cssVarNames.components.button.activeOffset})`,
      paddingSm: `var(${cssVarNames.components.button.paddingSm})`,
      paddingMd: `var(${cssVarNames.components.button.paddingMd})`,
      paddingLg: `var(${cssVarNames.components.button.paddingLg})`,
      minHeightSm: `var(${cssVarNames.components.button.minHeightSm})`,
      minHeightMd: `var(${cssVarNames.components.button.minHeightMd})`,
      minHeightLg: `var(${cssVarNames.components.button.minHeightLg})`
    },
    input: {
      invalidBorder: `var(${cssVarNames.components.input.invalidBorder})`
    },
    card: {
      shadow: `var(${cssVarNames.components.card.shadow})`
    }
  }
} as const satisfies CSSVariableRefs<typeof cssVarNames>;

export type ThemeCSSVariableName = LeafValues<typeof cssVarNames>;
export type ThemeCSSVariableRef = `var(${ThemeCSSVariableName})`;
