---
name: gh-issue-pr-flow
description: Execute this repository's GitHub issue, branch, commit, and PR workflow with the gh CLI. Use when implementing issue-driven changes, preparing commits, pushing branches, or opening pull requests.
---

# GitHub Issue/PR Flow

Use native `gh` CLI commands only.

## Branch and Issue Flow

1. Open issue context: `gh issue view <number>`
2. Optionally start from issue branch: `gh issue develop <number> --checkout`
3. Otherwise create a branch with prefix `codex/`.
4. Implement and validate changes.
5. Keep issue body focused on change summary + acceptance checks.
6. Commit with issue linkage; use `Closes #<number>` or `Fixes #<number>` only when complete, otherwise use `Refs #<number>`.
7. Push branch and create PR with `gh pr create`.
8. Merge PR.
9. Close issue manually only if auto-close did not trigger.

## Commit and Label Conventions

Use issue/commit format:

- `<emoji> <type>(<scope>): <summary>`

Allowed types:

- `✨ feat`
- `🐛 fix`
- `🧹 chore`
- `♻️ refactor`
- `📝 docs`
- `✅ test`
- `🎨 style`
- `⚡ perf`
- `♿ a11y`
- `👷 ci`
- `🔧 build`

Use labels in the shape `type: <emoji> <kind>`.
Update labels with `gh label create ... --force`.

## Commit Hygiene

- Keep commits atomic.
- Use imperative subject under 72 characters.
- Keep body to 1-3 lines.
- When scripting commits, pass multiple `-m` flags instead of literal `\n`.
- Verify latest commit message with `git log --format=medium -n 1`.

When asked to "commit and push", treat it as "commit, push, and open a PR" unless explicitly told not to open a PR.
