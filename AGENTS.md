# AGENTS

React 19 + TypeScript component library using Vite, Vitest, Storybook, and `pnpm@9.15.2`.

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

## Notes
- Follow `.oxlintrc.json` and `.prettierrc.json`.
- Update `README.md` when public API/usage changes.
- Do not hand-edit `dist/` artifacts.
