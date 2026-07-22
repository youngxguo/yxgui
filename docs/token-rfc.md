# RFC: Semantic tokens

- Status: Draft
- Last updated: 2026-07-22

## Summary

yxgui exposes a small semantic theme for components and application UI. A complete
JavaScript theme owns the values while StyleX stays internal. Consumers customize
typed, sparse overrides with `createTheme` and `ThemeProvider`, or use the
corresponding `--yxg-*` CSS custom properties.

## Initial set

The initial theme has 32 semantic decisions.

### Color: 18

- Background: `canvas`, `surface`, `raised`, `subtle`
- Foreground: `default`, `muted`
- Border: `default`, `strong`
- Accent: `solid`, `solidHover`, `solidPressed`, `contrast`, `subtle`, `foreground`
- Danger: `foreground`, `border`, `subtle`
- Focus: `focusRing`

### Typography: 5

- `body`
- `bodySmall`
- `label`
- `heading`
- `code`

Each typography role contains a family, size, line height, weight, and letter
spacing. The five roles therefore expand to 25 CSS custom properties while
remaining five decisions in the theme API.

### Controls and shape: 6

- Control: `height`, `paddingInline`, `gap`
- Radius: `control`, `container`, `full`

### Motion and state: 3

- Motion: `durationFast`, `easingStandard`
- Opacity: `disabled`

Together these 32 decisions compile to 52 public CSS custom properties.

## Why this is the minimum

- Neutral roles cover page, content, raised, and subtle surfaces without an
  elevation ladder.
- Accent is the only complete interactive color family because Button and Switch
  need distinct rest, hover, pressed, contrast, and selected treatments.
- Danger is the only feedback family because form validation needs it first.
- Typography uses complete product-UI roles instead of independent type scales.
- Control metrics support shared density; general layout spacing stays outside
  the semantic API.

Information, success, warning, overlays, elevation, entrance and exit motion,
inverse surfaces, and component-specific aliases are intentionally excluded until
a shipped component requires them.

## Contract

- `defaultTheme` is the single source of the complete semantic values.
- `createTheme` accepts deep partial semantic overrides and resolves a complete
  theme against `defaultTheme`.
- `ThemeProvider` maps a complete theme onto one element subtree and uses
  `defaultTheme` when no theme is supplied.
- `darkTheme` resolves its color overrides against the same default theme.
- Components and application CSS share stable `--yxg-*` properties.
- Consumers do not install, configure, or import StyleX.
- Default text, state, border, and focus relationships target WCAG 2.2 AA
  contrast.

## Validation boundary

Button currently proves the accent states, accent contrast, focus ring, label
typography, control metrics, control radius, fast motion, and disabled opacity.
Field, Input, and Switch should prove the remaining surface, foreground, border,
danger, typography, and shape roles. Any role they cannot use clearly should be
removed or combined before this RFC is accepted.

Compact density, reduced motion, forced colors, and additional feedback or overlay
families remain follow-up work rather than more initial tokens.
