---
name: Component / Enhancement
about: Propose a new component or a focused enhancement to an existing component
title: "feat(<component>): <outcome>"
labels: ["ctx:core"]
assignees: []
---

## What to add/change

<!-- 1-2 lines. Keep scope small and shippable. -->

## Acceptance checks

- [ ] Stories added/updated (and interaction assertions when relevant)
- [ ] Tests added/updated for user-visible behavior and public API contracts
- [ ] Public exports updated in `src/index.ts` (if adding a new component/slot)
- [ ] Accessibility semantics reviewed (labeling, roles/ARIA, keyboard/focus as applicable)
- [ ] README updated if public API/usage changes

## Component category

<!-- Helps apply the right checklist sections. Delete non-applicable rows. -->

- [ ] Form control
- [ ] Form composition
- [ ] Overlay / dialog / popover / tooltip
- [ ] Menu
- [ ] Navigation / selection widget
- [ ] Status / informational
- [ ] Layout / presentation

## API / Behavior Notes

<!-- Observable behavior + API expectations, not implementation details. -->

- Native prop/event passthrough expectations:
- Controlled/uncontrolled API (if applicable):
- Style override expectations (`className` / `style`):
- Intentional prop omissions/overrides (if any):

## Checklist References

- Native prop passthrough contract: `docs/core-prop-passthrough-contract.md`
- Accessibility semantics checklist: `docs/accessibility-semantics-checklist.md`

## Dependency Notes (Optional)

<!-- Only include when ordering materially matters. Example: Popover before DropdownMenu. -->

## Out of Scope (Optional)

<!-- Keep follow-up work out of this issue. Create separate issues instead. -->
