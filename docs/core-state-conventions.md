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
