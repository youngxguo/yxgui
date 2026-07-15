# RFC: StyleX token system

- Status: Draft
- Last updated: 2026-07-15
- Scope: Product requirements and conceptual model

## Summary

Tokens give yxgui a coherent default visual language and let consuming
applications use the same design decisions outside yxgui components.

StyleX is the canonical styling and theme layer. Themeable public tokens are
typed StyleX variables backed by stable `--yxg-*` CSS custom properties. The
initial system will be intentionally small and will grow from real component and
application needs.

## Goals

- Ship a polished default design that works without configuration.
- Give components and applications one shared visual language.
- Support global and scoped customization without component forks.
- Support brands, color schemes, density, contrast, and motion without requiring
  a separate component implementation.
- Keep accessible contrast, focus, target size, and motion behavior in the
  design contract.
- Keep the system understandable and small enough to maintain.

## Non-goals

- Finalizing every token or value before components exist
- Tokenizing every CSS declaration
- Designing component APIs
- Supporting multiple styling systems
- Defining long-term compatibility policy before the first package contract is
  proven

## Principles

### One design language

Components and applications should use the same underlying design decisions.
Most usage should express purpose, such as primary action, muted content, raised
surface, or body text, rather than raw palette values.

### Strong defaults, open customization

yxgui should look complete without configuration. Consumers should be able to
change broad design decisions or one component family without fighting internal
selectors.

### Designed through use

Shared tokens represent repeated design decisions. Component-specific tokens
are introduced only when a real component needs them. Structural details remain
ordinary styles or component logic.

### Accessible relationships

Accessibility depends on relationships between values. Foreground and
background colors, focus indicators, target sizes, density, and motion must be
designed and evaluated together.

## Token contracts

### Themeable variables

Values that change with a theme use StyleX variables and public `--yxg-*` CSS
custom properties. These are the normal integration point for components,
application styles, plain CSS, and third-party UI.

### Static constants

Fixed style decisions that do not need runtime theming remain compile-time
constants. Examples may include breakpoints or shared layer ordering.

### JavaScript values

StyleX variables are CSS identifiers rather than JavaScript data. A separate
JavaScript contract will be added only for genuine non-CSS consumers such as
charts. The package does not need to duplicate every token in JavaScript.

## Conceptual model

The system needs to cover three kinds of decisions. Their final names and module
layout will follow from the prototype.

- Foundational values provide consistent raw ingredients such as palettes,
  spacing, typography, radii, and motion.
- Shared meanings describe reusable purposes such as canvas, muted text, primary
  action, focus indicator, control height, and overlay elevation.
- Component decisions provide narrow customization only where shared meanings
  are not sufficient.

## Initial coverage

- Color for surfaces, content, borders, actions, states, feedback, focus, and
  overlays
- Typography for display, heading, body, label, and code roles
- Space and size for layout rhythm, controls, icons, and interactive targets
- Shape, borders, elevation, and shared layering
- Motion with reduced-motion alternatives
- Comfortable and compact density

## Themes

Themes must work by applying StyleX props to an ordinary element and must affect
that element's subtree without React context.

The first implementation should demonstrate:

- A complete default theme
- Light and dark color schemes
- Comfortable and compact density
- Standard and reduced motion
- A consumer brand override
- A nested, locally scoped override
- Predictable composition of the supported theme dimensions

Variable groups should follow the dimensions that need to compose. The prototype
must prove the supported combinations rather than assume arbitrary themes merge.

## Consumer contract

Consumers must be able to:

- Use the default yxgui design without theme configuration.
- Use shared tokens in StyleX application styles.
- Use stable `--yxg-*` custom properties in plain CSS and third-party code.
- Apply global and scoped themes without component-specific mode logic.
- Inspect active values in browser developer tools.
- Access JavaScript values where a demonstrated non-CSS use case requires them.

Before the token contract is accepted, a packed release must work in a clean
consumer application. That proof should establish CSS loading, package exports,
StyleX toolchain expectations, reset ownership, and scoped theme behavior.

## Accessibility

The default design targets WCAG 2.2 AA. Component behavior should follow native
HTML and established ARIA patterns where relevant.

Theme validation must cover contrast, visible focus, interactive target size,
reduced motion, keyboard use, and forced-color behavior where applicable.

## Validation

The token system succeeds when:

- A small settings interface can be built without inventing a parallel design
  system.
- The same tokens style surrounding application content.
- Brand, dark mode, compact density, and reduced motion work alone and together.
- A scoped override does not leak into the rest of the application.
- Default foreground and background relationships meet the accessibility target.
- Developers can understand why a token exists and where it should be used.

## Open product questions

1. Should yxgui provide an opinionated default typeface or inherit the
   application's family?
2. Which application-level layout decisions belong in yxgui?
3. How different should comfortable and compact density feel?
4. How much component-specific customization do expected consumers need?

## Next steps

1. Prove the StyleX package contract with a minimal packed-library fixture.
2. Define the visual direction and initial inventory alongside a small settings
   interface.
3. Test the required theme combinations and consumer overrides.
4. Finalize the initial token relationships, names, and package exports from the
   prototype, then accept this RFC.
