---
name: verification-gates
description: Select and run the right validation commands for this repo based on change scope. Use when deciding quick checks for component-only edits versus full quality gates before merge or release.
---

# Verification Gates

Use `package.json` scripts as the source of truth.

## Fast Path (component-only edits)

Run the smallest checks that verify the edited component behavior:

1. `pnpm lint`
2. `pnpm test -- <component test path or filter>` when possible
3. `pnpm test-storybook -- <story test path or filter>` when story `play` behavior changed

If targeting is not reliable, run `pnpm test` instead.

## Full Gate (cross-cutting or done gate)

Run:

1. `pnpm check:quality`

This expands to lint + unit tests + build.

## Useful Supporting Commands

- `pnpm typecheck`
- `pnpm format:check`
- `pnpm lint:fix`
- `pnpm test:watch`
- `pnpm test-storybook:watch`

Before pushing, run `pnpm check:prepush`.

## Testing Conventions

- Use Vitest + Testing Library.
- Prefer accessible role/name queries.
- Test behavior and public API.
- Prefer `play` assertions in an existing `Default` story.
- Add test-only stories only when they are also documented.
