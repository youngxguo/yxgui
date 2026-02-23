# Core State Conventions

This library uses a shared internal controllable-state utility (`src/components/_internal/useControllableState.ts`) to keep interactive APIs consistent.

## Naming Conventions

Use these public prop names for controllable components:

- Value-based components: `value`, `defaultValue`, `onValueChange`
- Open/closed components: `open`, `defaultOpen`, `onOpenChange`
- Checked/toggle components: `checked`, `defaultChecked`, `onCheckedChange`

Notes:

- The internal hook uses a generic `onChange` callback parameter.
- Public components should expose domain-specific callback names and map them to the hook internally.

## Current Adoption Notes

The shared utility is already used in several interactive components, including:

- `Dialog`
- `Popover`
- `DropdownMenu`
- `Tabs`
- `Collapsible`
- `Accordion`

Follow-up migrations can move remaining interactive components to the shared utility when their behavior matches the controllable/uncontrolled pattern.

## Shared Data Attributes

Use a small shared set of `data-*` state attributes so component styling and tests can rely on consistent hooks.

- `data-state`: finite component state (`open`/`closed`, `active`/`inactive`, `on`/`off`, `checked`/`unchecked`)
- `data-disabled`: present (`""`) when the control is disabled
- `data-invalid`: present (`""`) when the control is invalid
- `data-orientation`: structural state for directional composites (`horizontal` / `vertical`)

Conventions:

- Derive `aria-*` and `data-*` state from the same normalized booleans to avoid contradictory output.
- Prefer presence attributes (`data-disabled`, `data-invalid`) for boolean flags and `data-state` for enumerated UI state.
- Component-specific attributes (for example `data-side`) are allowed, but the shared attributes above should be reused whenever they express the same state.
