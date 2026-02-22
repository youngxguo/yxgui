import type { Theme } from './types';

export type ThemeCSSVariables = Record<`--${string}`, number | string>;

export function themeToCSSVariables(theme: Theme): ThemeCSSVariables {
  return {
    '--yx-palette-background': theme.palette.background,
    '--yx-palette-foreground': theme.palette.foreground,
    '--yx-palette-border': theme.palette.border,
    '--yx-palette-accent': theme.palette.accent,
    '--yx-palette-focus-ring': theme.palette.focusRing,
    '--yx-palette-muted-foreground': theme.palette.mutedForeground,
    '--yx-typography-font-family': theme.typography.fontFamily,
    '--yx-typography-font-weight-strong': theme.typography.fontWeightStrong,
    '--yx-typography-font-size-sm': theme.typography.fontSizeSm,
    '--yx-typography-font-size-md': theme.typography.fontSizeMd,
    '--yx-typography-font-size-lg': theme.typography.fontSizeLg,
    '--yx-typography-line-height-tight': theme.typography.lineHeightTight,
    '--yx-radius-pill': theme.radius.pill,
    '--yx-spacing-xs': theme.spacing.xs,
    '--yx-spacing-sm': theme.spacing.sm,
    '--yx-spacing-md': theme.spacing.md,
    '--yx-spacing-lg': theme.spacing.lg,
    '--yx-components-button-primary-background': theme.components.button.primaryBackground,
    '--yx-components-button-primary-foreground': theme.components.button.primaryForeground,
    '--yx-components-button-primary-hover-shadow': theme.components.button.primaryHoverShadow,
    '--yx-components-button-secondary-background': theme.components.button.secondaryBackground,
    '--yx-components-button-secondary-foreground': theme.components.button.secondaryForeground,
    '--yx-components-button-secondary-border': theme.components.button.secondaryBorder,
    '--yx-components-button-secondary-hover-border': theme.components.button.secondaryHoverBorder,
    '--yx-components-button-ghost-foreground': theme.components.button.ghostForeground,
    '--yx-components-button-ghost-hover-background': theme.components.button.ghostHoverBackground,
    '--yx-components-button-disabled-opacity': theme.components.button.disabledOpacity,
    '--yx-components-button-active-offset': theme.components.button.activeOffset,
    '--yx-components-button-padding-sm': theme.components.button.paddingSm,
    '--yx-components-button-padding-md': theme.components.button.paddingMd,
    '--yx-components-button-padding-lg': theme.components.button.paddingLg,
    '--yx-components-button-min-height-sm': theme.components.button.minHeightSm,
    '--yx-components-button-min-height-md': theme.components.button.minHeightMd,
    '--yx-components-button-min-height-lg': theme.components.button.minHeightLg
  };
}
