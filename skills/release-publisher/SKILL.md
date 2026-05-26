---
name: release-publisher
description: Publish this package to npm and keep npm version, git tag, and GitHub release aligned. Use when preparing or executing releases, including 2FA handling and release verification.
---

# Release Publisher

Goal: keep npm package, git tag, and GitHub release aligned to the same commit/version.

Preferred path:

1. Confirm clean tree: `git status --short`
2. Confirm auth: `npm whoami` and `gh auth status`
3. Bump `package.json` version and commit it.
4. Dry run: `npm publish --dry-run`
5. Run quality gate: `pnpm check:quality`
6. Run automated release flow: `pnpm release:publish`

If npm 2FA prompts, rerun with:

- `pnpm release:publish -- --otp <code>`

## Manual Fallback

If scripted release cannot be used, run manually:

1. `npm publish` (or `npm publish --otp <code>`)
2. Create annotated tag on the publish commit: `git tag -a vX.Y.Z <commit> -m "vX.Y.Z"`.
3. Do not move or recreate a release tag after publish unless absolutely necessary.
4. Push main and tag: `git push origin main` and `git push origin vX.Y.Z`.
5. Create GitHub release: `gh release create vX.Y.Z --verify-tag --title "vX.Y.Z" --generate-notes`.
6. If release already exists, use `gh release edit`.

## Verification

1. `npm view <package-name> version dist-tags --json`
2. `gh release view vX.Y.Z`
3. `git show --no-patch --format=fuller vX.Y.Z`
4. `git ls-remote --tags origin "vX.Y.Z*"` and confirm the `^{}` commit matches the published commit.

## Failure Handling

- `EOTP`: rerun publish with `--otp <code>`.
- `E403`: verify package ownership, package name, and npm token/account permissions.
