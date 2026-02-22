import type { Theme } from './types';
import { cssVarNames, type ThemeCSSVariableName } from './vars.stylex';

export type ThemeCSSVariables = { [K in ThemeCSSVariableName]: number | string };

export function themeToCSSVariables(theme: Theme): ThemeCSSVariables {
  return {
    // Palette
    [cssVarNames.palette.background]: theme.palette.background,
    [cssVarNames.palette.foreground]: theme.palette.foreground,
    [cssVarNames.palette.border]: theme.palette.border,
    [cssVarNames.palette.accent]: theme.palette.accent,
    [cssVarNames.palette.focusRing]: theme.palette.focusRing,
    [cssVarNames.palette.mutedForeground]: theme.palette.mutedForeground,
    // Typography
    [cssVarNames.typography.fontFamily]: theme.typography.fontFamily,
    [cssVarNames.typography.fontWeightStrong]: theme.typography.fontWeightStrong,
    [cssVarNames.typography.fontSizeSm]: theme.typography.fontSizeSm,
    [cssVarNames.typography.fontSizeMd]: theme.typography.fontSizeMd,
    [cssVarNames.typography.fontSizeLg]: theme.typography.fontSizeLg,
    [cssVarNames.typography.lineHeightTight]: theme.typography.lineHeightTight,
    // Radius
    [cssVarNames.radius.sm]: theme.radius.sm,
    [cssVarNames.radius.md]: theme.radius.md,
    [cssVarNames.radius.lg]: theme.radius.lg,
    [cssVarNames.radius.pill]: theme.radius.pill,
    // Spacing
    [cssVarNames.spacing.xs]: theme.spacing.xs,
    [cssVarNames.spacing.sm]: theme.spacing.sm,
    [cssVarNames.spacing.md]: theme.spacing.md,
    [cssVarNames.spacing.lg]: theme.spacing.lg,
    // Semantic surfaces and borders
    [cssVarNames.surface.base]: theme.surface.base,
    [cssVarNames.surface.elevated]: theme.surface.elevated,
    [cssVarNames.surface.subtle]: theme.surface.subtle,
    [cssVarNames.border.default]: theme.border.default,
    [cssVarNames.border.muted]: theme.border.muted,
    [cssVarNames.border.strong]: theme.border.strong,
    [cssVarNames.border.focus]: theme.border.focus,
    // Controls
    [cssVarNames.control.background]: theme.control.background,
    [cssVarNames.control.backgroundDisabled]: theme.control.backgroundDisabled,
    [cssVarNames.control.foreground]: theme.control.foreground,
    [cssVarNames.control.placeholder]: theme.control.placeholder,
    [cssVarNames.control.border]: theme.control.border,
    [cssVarNames.control.borderFocus]: theme.control.borderFocus,
    // Shared variants
    [cssVarNames.variants.primary.background]: theme.variants.primary.background,
    [cssVarNames.variants.primary.foreground]: theme.variants.primary.foreground,
    [cssVarNames.variants.secondary.background]: theme.variants.secondary.background,
    [cssVarNames.variants.secondary.foreground]: theme.variants.secondary.foreground,
    [cssVarNames.variants.secondary.border]: theme.variants.secondary.border,
    [cssVarNames.variants.secondary.hoverBorder]: theme.variants.secondary.hoverBorder,
    [cssVarNames.variants.ghost.foreground]: theme.variants.ghost.foreground,
    [cssVarNames.variants.ghost.hoverBackground]: theme.variants.ghost.hoverBackground,
    [cssVarNames.variants.outline.border]: theme.variants.outline.border,
    [cssVarNames.variants.outline.foreground]: theme.variants.outline.foreground,
    // Components: Button
    [cssVarNames.components.button.primaryHoverShadow]: theme.components.button.primaryHoverShadow,
    [cssVarNames.components.button.disabledOpacity]: theme.components.button.disabledOpacity,
    [cssVarNames.components.button.activeOffset]: theme.components.button.activeOffset,
    [cssVarNames.components.button.paddingSm]: theme.components.button.paddingSm,
    [cssVarNames.components.button.paddingMd]: theme.components.button.paddingMd,
    [cssVarNames.components.button.paddingLg]: theme.components.button.paddingLg,
    [cssVarNames.components.button.minHeightSm]: theme.components.button.minHeightSm,
    [cssVarNames.components.button.minHeightMd]: theme.components.button.minHeightMd,
    [cssVarNames.components.button.minHeightLg]: theme.components.button.minHeightLg,
    // Components: Input
    [cssVarNames.components.input.invalidBorder]: theme.components.input.invalidBorder,
    // Components: Card
    [cssVarNames.components.card.shadow]: theme.components.card.shadow
  };
}
