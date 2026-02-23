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
- Publish (npm): `npm publish` (pass `--otp <code>` when npm 2FA requires it)
- Publish dry-run: `npm publish --dry-run`

## GitHub / Commits

- Use native `gh` CLI only (`gh auth login` if needed); no wrappers.
- Keep issues small; use issues as backlog.
- Issue/commit format: `<emoji> <type>(<scope>): <summary>`.
- Issue body: change + acceptance checks.
- Types: `✨ feat`, `🐛 fix`, `🧹 chore`, `♻️ refactor`, `📝 docs`, `✅ test`, `🎨 style`, `⚡ perf`, `♿ a11y`, `👷 ci`, `🔧 build`.
- Labels: `type: <emoji> <kind>`; update with `gh label create ... --force`.
- Flow: `gh issue view` -> implement -> validate -> commit (`Closes #123` / `Fixes #123` when completed; `Refs #123` otherwise) -> push -> `gh issue close` only if auto-close did not trigger.
- Optional: `gh issue develop <number> --checkout`.
- Commits: atomic, imperative subject (<72 chars), 1-3 line body, no literal `\n` in scripted commits (use multiple `-m` flags).
- Include tests with behavior changes; verify message before push: `git log --format=medium -n 1`.
- `pre-push`: `pnpm check:prepush`; CI: `pnpm check:quality`.

## Testing

- Vitest + Testing Library; prefer accessible role/name queries.
- Test behavior + public API.
- Prefer `play` assertions in existing `Default` story.
- Test-only stories only when also documented.

## Release Runbook

- Goal: keep npm package, git tag, and GitHub release aligned to the same version and commit.
- Preflight:
  - `git status --short` must be clean (or commit/stash unrelated work first).
  - `npm whoami` should return the expected npm account.
  - `gh auth status` should be valid for GitHub release/tag pushes.
- Versioning:
  - Bump `package.json` version before publishing (use semver).
  - Commit the version bump before publish so the release can be tagged on that commit.
- Verify before publish:
  - `npm publish --dry-run`
  - `pnpm check:quality` (or rely on `prepublishOnly`, but dry-run first)
- Publish to npm:
  - `npm publish`
  - If npm 2FA is enabled and returns `EOTP`, rerun with `npm publish --otp <code>`.
  - If npm returns `E403`, verify package ownership/name and token/account publish permissions.
- Tagging (annotated tags only):
  - Create `vX.Y.Z` on the exact commit that produced the published artifact: `git tag -a vX.Y.Z <commit> -m "vX.Y.Z"`
  - Do not move/recreate a release tag after publish unless absolutely necessary.
  - Verify target commit: `git show --no-patch --format=fuller vX.Y.Z`
- Push sequence:
  - `git push origin main`
  - `git push origin vX.Y.Z`
  - Verify remote tag target: `git ls-remote --tags origin "vX.Y.Z*"` (check `^{}` commit matches the published commit)
- GitHub release:
  - `gh release create vX.Y.Z --verify-tag --title "vX.Y.Z" --generate-notes`
  - If the release already exists, update it with `gh release edit`.
- Post-release verification:
  - `npm view <package-name> version dist-tags --json`
  - `gh release view vX.Y.Z`
  - Optionally install-test from a clean app (`pnpm add <package-name>@X.Y.Z`)

## Notes

- Follow `eslint.config.mjs` and `.prettierrc.json`.
- Update `README.md` for public API/usage changes.
- Keep workflow/automation details in `AGENTS.md`, not `README.md`.
- Do not commit or hand-edit `dist/`.
- Before publish, confirm auth with `npm whoami` and verify the tarball with `npm publish --dry-run`.
