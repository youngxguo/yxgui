---
name: component-authoring-react19
description: Build or update React 19 TypeScript components for this library with production-ready styling, composable APIs, and matching stories/tests. Use when adding or refactoring components, props, styles, stories, or component exports.
---

# Component Authoring (React 19)

Follow these rules for component work in this repository:

- Build styled, production-ready components first.
- Keep APIs composable and typed with explicit `Props` interfaces.
- Split behavior and styling into separate modules when complexity grows.
- Use function components with named exports.
- Use React 19 `ref` prop pattern only; do not use `React.forwardRef`.
- Prefer narrow unions and destructured defaults; do not use `defaultProps`.
- Prefer shared tokens (for example `spacingTokens`) over raw sizes.
- Do not use `calc(...)` sizing.
- Prefer `Typography` for user-visible text.

Use this file layout for components:

- `src/components/<ComponentName>/<ComponentName>.tsx`
- `src/components/<ComponentName>/<ComponentName>.css`
- `src/components/<ComponentName>/<ComponentName>.stories.tsx`
- `src/components/<ComponentName>/<ComponentName>.test.tsx`

After adding a public component, export it from `src/index.ts`.

For behavior changes, update tests and stories in the same component folder.
