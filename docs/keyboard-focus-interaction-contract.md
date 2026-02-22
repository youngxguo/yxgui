# Keyboard and Focus Interaction Contract

This document defines the shared test scope for keyboard/focus behavior in `src/test/interaction-contract.test.tsx`.

## Baseline Coverage (Current Controls)

- Tab focusability for interactive controls that should be reachable in the tab order
- Keyboard activation for button-based controls (`Enter`, `Space`)
- Keyboard toggle for native checkbox/radio-style inputs (`Space`)
- Disabled behavior:
  - no pointer activation callbacks
  - skipped in tab order

## Overlay/Menu Pattern Helpers

Shared helpers define a reusable test pattern for components like `Dialog`, `Popover`, `DropdownMenu`, and future menu/overlay primitives:

- escape-key dismiss contract
- focus restore to trigger after close (when the component promises it)

Use these helpers in component tests or shared contract tests when adding new overlays.

## Scope Boundaries (Browser Differences)

Keyboard behavior is not identical across all element types, and some details vary between browsers and JSDOM:

- `Enter` activation is standard for buttons, but not for all form controls
- `Space` toggles checkboxes/radios, while buttons also activate on `Space`
- Native browser default actions may differ from custom key handlers in timing (`keydown` vs `keyup`)
- JSDOM does not perfectly emulate every browser default action sequence

Because of this, contract tests focus on stable, user-visible outcomes (focus movement, activation/toggle callbacks, dismiss/restore behavior) rather than low-level event ordering.
