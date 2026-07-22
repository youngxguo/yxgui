# RFC: Semantic tokens

- Status: Draft

## Purpose

yxgui uses StyleX for its complete token and theme pipeline. Fixed design values,
semantic variables, and built-in themes are separate compile-time layers. Components
consume semantic variables directly instead of CSS variable strings or a parallel
JavaScript theme object.

## Principles

- Tokens represent shared design decisions, not every value used in CSS.
- Add a token only when real UI needs that value across components.
- Keep fixed values in `values.stylex.ts`.
- Map fixed values to purpose-based variables in `tokens.stylex.ts`.
- Define built-in light and dark overrides with `stylex.createTheme` in `themes.ts`.
- Keep component-specific details local until they need to be shared.
- Do not expose generated CSS custom-property names as a public contract.

## Contract

- Components import typed semantic StyleX variables directly.
- `lightTheme` and `darkTheme` are StyleX theme objects that consumers apply with
  `stylex.props` to scope a built-in theme to an element subtree.
- StyleX is an explicit peer dependency and part of the public styling contract.
- Arbitrary runtime theme objects, deep-merge helpers, and a theme provider are not
  part of the API.
- Default text, state, border, and focus relationships target WCAG 2.2 AA contrast.

## Validation

Tokens should be exercised by real components or shared application styles. Defaults
should form a coherent, accessible interface, and the packed library must retain its
static CSS and no-StyleX-consumer contract.
