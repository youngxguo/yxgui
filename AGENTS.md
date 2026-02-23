# AGENTS

React 19 + TypeScript component library (Vite, Vitest, Storybook, `pnpm@9.15.2`).

## Rules

- Build styled, production-ready components first; keep APIs composable.
- Split behavior/styling when complexity grows.
- Prefer shared tokens (`spacingTokens`) over raw sizes; no `calc(...)` sizing.
- Use function components, named exports, explicit `Props`.
- React 19 `ref` prop pattern only; no `React.forwardRef`.
- Prefer narrow unions + destructured defaults; no `defaultProps`.
- Prefer `Typography` for user-visible text.
- Component files: `src/components/<ComponentName>/` with `.tsx`, `.css`, `.stories.tsx`, `.test.tsx`.
- Export public API from `src/index.ts`.

## Commands

- Install: `pnpm install`
- Done gate: `pnpm lint`, `pnpm test`, `pnpm build`
- Common: `pnpm storybook`, `pnpm test:watch`, `pnpm typecheck`, `pnpm format`, `pnpm format:check`, `pnpm lint:fix`, `pnpm build-storybook`

## GitHub / Commits

- Use native `gh` CLI only (`gh auth login` if needed); no wrappers.
- Keep issues small; use issues as backlog.
- Issue/commit format: `<emoji> <type>(<scope>): <summary>`.
- Issue body: change + acceptance checks.
- Types: `✨ feat`, `🐛 fix`, `🧹 chore`, `♻️ refactor`, `📝 docs`, `✅ test`, `🎨 style`, `⚡ perf`, `♿ a11y`, `👷 ci`, `🔧 build`.
- Labels: `type: <emoji> <kind>`; update with `gh label create ... --force`.
- Flow: `gh issue view` -> implement -> validate -> commit (`Refs #123`) -> push -> `gh issue close`.
- Optional: `gh issue develop <number> --checkout`.
- Commits: atomic, imperative subject (<72 chars), 1-3 line body, no literal `\n` in scripted commits (use multiple `-m` flags).
- Include tests with behavior changes; verify message before push: `git log --format=medium -n 1`.
- `pre-push`: `pnpm check:prepush`; CI: `pnpm check:quality`.

## Testing

- Vitest + Testing Library; prefer accessible role/name queries.
- Test behavior + public API.
- Prefer `play` assertions in existing `Default` story.
- Test-only stories only when also documented.

## Notes

- Follow `eslint.config.mjs` and `.prettierrc.json`.
- Update `README.md` for public API/usage changes.
- Keep workflow/automation details in `AGENTS.md`, not `README.md`.
- Do not commit or hand-edit `dist/`.
