# AGENTS

React 19 + TypeScript component library (Vite, Vitest, Storybook, `pnpm@9.15.2`).

## Always-On Policy

- Build styled, production-ready components first; keep APIs composable.
- Prefer shared tokens (`spacingTokens`) over raw sizes; do not use `calc(...)` sizing.
- Use function components, named exports, explicit `Props`, and React 19 `ref` prop pattern only.
- Prefer narrow unions + destructured defaults; do not use `defaultProps`.
- Prefer `Typography` for user-visible text.
- Keep component files under `src/components/<ComponentName>/` with `.tsx`, `.css`, `.stories.tsx`, `.test.tsx`.
- Export public API from `src/index.ts`.
- Use native `gh` CLI only for GitHub operations.
- Do not commit or hand-edit `dist/`.

## Script Source Of Truth

Use only scripts that exist in `package.json`:

- Install: `pnpm install`
- Done gate: `pnpm check:quality`
- Pre-push gate: `pnpm check:prepush`
- Core: `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm typecheck`
- Formatting: `pnpm format`, `pnpm format:check`, `pnpm lint:fix`
- Storybook: `pnpm storybook`, `pnpm storybook:port`, `pnpm storybook:ports`, `pnpm build-storybook`
- Storybook tests: `pnpm test-storybook`, `pnpm test-storybook:coverage`, `pnpm test-storybook:watch`
- Unit test watch: `pnpm test:watch`
- Release: `pnpm release:publish` (use `pnpm release:publish -- --otp <code>` for npm 2FA)

## Skill Playbooks

Load only the matching playbook for the task:

- Component authoring: `skills/component-authoring-react19/SKILL.md`
- Verification scope and gates: `skills/verification-gates/SKILL.md`
- Issue/branch/commit/PR flow: `skills/gh-issue-pr-flow/SKILL.md`
- npm + tag + GitHub release flow: `skills/release-publisher/SKILL.md`

## Minimal Defaults

- Default delivery path is branch -> push -> PR (never push directly to `main`).
- Include tests with behavior changes.
- Update `README.md` when public API/usage changes.
