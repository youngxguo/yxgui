# AGENTS

React 19 + TypeScript component library using Vite, Vitest, Storybook, and `pnpm@9.15.2`.

## Philosophy
- Build opinionated, production-ready styled components first.
- Keep APIs composable so headless primitives can be introduced later.
- Separate behavior from styling when complexity grows (dialogs, menus, tabs).

## Commands
- Install: `pnpm install`
- Lint: `pnpm lint` (`pnpm lint:fix` to auto-fix)
- Format: `pnpm format:check` (`pnpm format` to write)
- Typecheck: `pnpm typecheck`
- Test: `pnpm test` (`pnpm test:watch` for watch mode)
- Build: `pnpm build`
- Storybook: `pnpm storybook` / `pnpm build-storybook`

## Completion Gate
Run: `pnpm lint`, `pnpm test`, and `pnpm build`.

## Code Rules
- Use function components, named exports, and explicit `Props` interfaces.
- Use React 19 `ref` prop pattern; do not introduce `React.forwardRef`.
- Prefer narrow prop unions and destructured default values (not `defaultProps`).
- Keep components in `src/components/<ComponentName>/` with colocated `.tsx`, `.css`, `.stories.tsx`, and `.test.tsx`.
- Export public API from `src/index.ts`.

## Testing Rules
- Use Vitest + Testing Library.
- Prefer accessible role/name queries.
- Test user-visible behavior and public API contracts.
- For Storybook interaction tests, prefer adding `play` assertions to the existing `Default` story so docs stay uncluttered.
- Only add test-only stories when the interaction itself is a documented scenario/variant.

## Commit Rules
- Keep commits atomic: one logical change per commit; split refactors from behavior changes.
- Do not mix unrelated files in the same commit.
- Use clear conventional-style subjects: `<type>(<scope>): <summary>` (e.g. `feat(button): add loading state`).
- Keep subject lines imperative and under 72 characters.
- Add a concise commit body that explains what changed and why (1-3 short lines).
- When behavior changes, include tests in the same commit.
- The `pre-push` hook enforces commit-body quality checks.
- CI enforces `pnpm check:quality` (`pnpm lint`, `pnpm test`, `pnpm build`).
- Do not commit generated artifacts in `dist/`.

## Notes
- Follow `eslint.config.mjs` and `.prettierrc.json`.
- Update `README.md` when public API/usage changes.
- Do not hand-edit `dist/` artifacts.
