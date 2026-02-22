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

export const varPaletteForeground = 'var(--yxgui-palette-foreground)';
export const varPaletteMutedForeground = 'var(--yxgui-palette-muted-foreground)';

export const varTypographyFontFamily = 'var(--yxgui-typography-font-family)';
export const varTypographyFontWeightStrong = 'var(--yxgui-typography-font-weight-strong)';
export const varTypographyFontSizeSm = 'var(--yxgui-typography-font-size-sm)';
export const varTypographyFontSizeMd = 'var(--yxgui-typography-font-size-md)';
export const varTypographyFontSizeLg = 'var(--yxgui-typography-font-size-lg)';
export const varTypographyLineHeightTight = 'var(--yxgui-typography-line-height-tight)';

export const varRadiusMd = 'var(--yxgui-radius-md)';
export const varRadiusLg = 'var(--yxgui-radius-lg)';
export const varRadiusPill = 'var(--yxgui-radius-pill)';

export const varSpacingXs = 'var(--yxgui-spacing-xs)';
export const varSpacingSm = 'var(--yxgui-spacing-sm)';
export const varSpacingLg = 'var(--yxgui-spacing-lg)';

export const varSurfaceElevated = 'var(--yxgui-surface-elevated)';

export const varBorderDefault = 'var(--yxgui-border-default)';
export const varBorderStrong = 'var(--yxgui-border-strong)';
export const varBorderFocus = 'var(--yxgui-border-focus)';

export const varControlBackground = 'var(--yxgui-control-background)';
export const varControlBackgroundDisabled = 'var(--yxgui-control-background-disabled)';
export const varControlForeground = 'var(--yxgui-control-foreground)';
export const varControlPlaceholder = 'var(--yxgui-control-placeholder)';
export const varControlBorder = 'var(--yxgui-control-border)';
export const varControlBorderFocus = 'var(--yxgui-control-border-focus)';

export const varVariantsPrimaryBackground = 'var(--yxgui-variants-primary-background)';
export const varVariantsPrimaryForeground = 'var(--yxgui-variants-primary-foreground)';
export const varVariantsSecondaryBackground = 'var(--yxgui-variants-secondary-background)';
export const varVariantsSecondaryForeground = 'var(--yxgui-variants-secondary-foreground)';
export const varVariantsSecondaryBorder = 'var(--yxgui-variants-secondary-border)';
export const varVariantsSecondaryHoverBorder = 'var(--yxgui-variants-secondary-hover-border)';
export const varVariantsGhostForeground = 'var(--yxgui-variants-ghost-foreground)';
export const varVariantsGhostHoverBackground = 'var(--yxgui-variants-ghost-hover-background)';
export const varVariantsOutlineBorder = 'var(--yxgui-variants-outline-border)';
export const varVariantsOutlineForeground = 'var(--yxgui-variants-outline-foreground)';

export const varComponentsButtonPrimaryHoverShadow =
  'var(--yxgui-components-button-primary-hover-shadow)';
export const varComponentsButtonDisabledOpacity = 'var(--yxgui-components-button-disabled-opacity)';
export const varComponentsButtonActiveOffset = 'var(--yxgui-components-button-active-offset)';
export const varComponentsButtonPaddingSm = 'var(--yxgui-components-button-padding-sm)';
export const varComponentsButtonPaddingMd = 'var(--yxgui-components-button-padding-md)';
export const varComponentsButtonPaddingLg = 'var(--yxgui-components-button-padding-lg)';
export const varComponentsButtonMinHeightSm = 'var(--yxgui-components-button-min-height-sm)';
export const varComponentsButtonMinHeightMd = 'var(--yxgui-components-button-min-height-md)';
export const varComponentsButtonMinHeightLg = 'var(--yxgui-components-button-min-height-lg)';

export const varComponentsInputInvalidBorder = 'var(--yxgui-components-input-invalid-border)';
export const varComponentsCardShadow = 'var(--yxgui-components-card-shadow)';
