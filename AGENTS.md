# AGENTS

React 19 + TypeScript component library (Vite, Vitest, Storybook, `pnpm@9.15.2`).

## Rules

- Prefer shared tokens (`spacingTokens`) over raw sizes; no `calc(...)` sizing.
- Use function components, named exports, explicit `Props`.
- React 19 `ref` prop pattern only; no `React.forwardRef`.
- Prefer narrow unions + destructured defaults; no `defaultProps`.
- Prefer `Typography` for user-visible text.
- Component files: `src/components/<ComponentName>/` with `.tsx`, `.css`, `.stories.tsx`, `.test.tsx`.
- Export public API from `src/index.ts`.

## Commands

- Install: `pnpm install`
- Quality gate: `pnpm lint`, `pnpm test`, `pnpm build`
- Common: `pnpm typecheck`, `pnpm storybook`, `pnpm test:watch`, `pnpm format`, `pnpm lint:fix`

## GitHub / Commits

- Use the GitHub Codex plugin for repo/PR/issue workflows; use local `git`/`gh` when needed for checkout, branch, push, auth checks, or other CLI-only gaps.
- Default delivery path: create a branch, push it, and create a PR for every change; do not push directly to `main`.
- When asked to "commit and push", treat it as "commit, push, and open a PR" unless the user explicitly says not to create a PR.
- Commit format: `<emoji> <type>(<scope>): <summary>`.
- Commits: atomic, imperative subject (<72 chars), 1-3 line body, no literal `\n` in scripted commits (use multiple `-m` flags).
- Include tests with behavior changes; verify the final commit message with `git log --format=medium -n 1`.
- `pre-push`: `pnpm check:prepush`; CI: `pnpm check:quality`.

## Testing

- Vitest + Testing Library; prefer accessible role/name queries.
- For component-only edits, run verification for the affected component(s) only; run full suite only for cross-cutting changes or done gate.
- Test behavior + public API.
- Prefer `play` assertions in existing `Default` story.
- Test-only stories only when also documented.

## Notes

- Follow `eslint.config.mjs` and `.prettierrc.json`.
- Update `README.md` for public API/usage changes.
- Keep workflow/automation details in `AGENTS.md`, not `README.md`.
- Do not commit or hand-edit `dist/`.
