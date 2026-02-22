# Accessibility Semantics Checklist

Contributor-facing checklist for implementing and reviewing yxgui components with consistent accessibility semantics.

Issue: `#48`

## How To Use

- Use this checklist when adding a new component or modifying component behavior
- Apply only the sections relevant to the component category (see mapping below)
- Treat deviations as explicit design decisions and document them in the issue/PR

## Core Checklist

### Labeling

- The interactive/control element has an accessible name (`<label>`, `aria-label`, `aria-labelledby`, visible text, etc.)
- Composite components wire labels to the correct owned element (for example trigger or content)
- Slot components that render headings/descriptions preserve semantic elements (`h*`, `p`) unless intentionally overridden

### Descriptions (`aria-describedby`)

- Help text and error text can be associated with the control using `aria-describedby`
- When a wrapper composes descriptions (for example `FormFieldControl`), existing consumer `aria-describedby` values are preserved/merged
- IDs used by descriptions/errors are stable for the mounted lifecycle

### Invalid State (`aria-invalid`)

- Form controls expose an invalid state API and/or support native `aria-invalid`
- If the component has an `invalid` prop, it sets or merges `aria-invalid` predictably
- Grouped controls (for example `RadioGroup`) apply invalid semantics at the correct container/control level

### Disabled / Required Semantics

- Disabled behavior uses native `disabled` when available (button/input/select/textarea)
- Custom controls expose equivalent semantics (`aria-disabled`, non-interactive behavior) when native `disabled` is not sufficient
- Required state is conveyed semantically (`required`, `aria-required`, label indicators as supplemental only)
- Disabled/required styling does not replace disabled/required semantics

### Keyboard Support

- Focusable elements are keyboard reachable (tab order is intentional)
- Activation keys are supported for interactive controls (`Enter` / `Space`) where applicable
- Composite widgets support expected navigation keys for their pattern (tabs, menus, etc.)
- Keyboard handlers compose with consumer handlers where supported
- Keyboard-only use does not trap focus unintentionally (unless component is an intentional modal/dialog)

### Focus Management

- Initial focus on open/mount is intentional for overlays/dialogs/popovers
- Focus restoration on close is defined for overlays/dialogs/menus
- Focus-visible state is preserved (styling should not hide focus indicators)
- Programmatic focus targets match the documented ref target

### Roles / ARIA Ownership

- Component-owned roles and ARIA attributes are documented and consistently applied
- Consumer-provided ARIA attributes pass through unless intentionally overridden for semantics
- Any required role/attribute override is reflected in prop types/docs (for example trigger buttons forcing `type="button"` and owning `aria-expanded`)

## Category Applicability Map

Use this to scope the checklist quickly.

### Form Controls (`Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Radio`, `RadioGroup`)

- Labeling
- `aria-describedby`
- `aria-invalid`
- disabled/required semantics
- keyboard support
- focus management (basic focusability)
- roles/ARIA ownership (especially custom controls like `Switch`)

### Form Composition (`FormField`, `FormFieldLabel`, `FormFieldControl`, `FormFieldDescription`, `FormFieldError`)

- Labeling
- `aria-describedby` composition/merging
- `aria-invalid` propagation
- required semantics propagation
- roles/ARIA ownership (error role, wrapper semantics)

### Overlays / Dialogs / Popovers / Tooltips (`Dialog`, `Popover`, `Tooltip`)

- Labeling (`DialogTitle`/`DialogDescription`, tooltip trigger/content linkage)
- keyboard support (`Escape`, trigger interactions)
- focus management (initial focus, restore focus, close behavior)
- roles/ARIA ownership (`role="dialog"`, `aria-modal`, trigger `aria-expanded`/`aria-controls`)

### Menus (`DropdownMenu`, menu content/items)

- Labeling (trigger and menu item names)
- keyboard support (open, roving focus, close on `Escape`)
- focus management (focus into menu and restore to trigger)
- disabled semantics (`disabled`/`aria-disabled` on items)
- roles/ARIA ownership (`menu`, `menuitem`, trigger `aria-haspopup`)

### Navigation / Selection Widgets (`Tabs`)

- Labeling (tab names and panel linkage)
- keyboard support (arrow keys, Home/End)
- focus management (roving focus / active tab focus behavior)
- roles/ARIA ownership (`tablist`, `tab`, `tabpanel`, `aria-controls`, `aria-labelledby`)

### Status / Informational Components (`Alert`, `Progress`)

- Labeling (especially progress accessible name)
- roles/ARIA ownership (`status`, `alert`, `progressbar`, `aria-valuenow/max`)
- keyboard support usually not applicable unless interactive

### Layout / Presentation Components (`Card`, `Badge`, `Separator`, `Skeleton`)

- Semantics are minimal by default; verify no misleading roles
- `Separator` requires orientation/role correctness when non-decorative
- `Skeleton` should remain hidden from assistive tech unless intentionally exposed

## Review Notes (Current Process)

- There is no `.github/ISSUE_TEMPLATE` for new components yet
- Until a template exists, link this checklist directly from new component issues and PR descriptions when behavior/a11y is in scope
- Future issue template should include a short checkbox linking this file
