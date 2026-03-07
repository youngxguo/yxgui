#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ -n "$(git status --short)" ]]; then
  echo "error: working tree must be clean before release"
  exit 1
fi

current_branch="$(git branch --show-current)"
if [[ "$current_branch" != "main" ]]; then
  echo "error: releases must run from main (current: $current_branch)"
  exit 1
fi

package_name="$(node -p "require('./package.json').name")"
version="$(node -p "require('./package.json').version")"
tag="v${version}"
commit="$(git rev-parse HEAD)"

echo "Preparing release ${package_name}@${version} from ${commit}"

npm whoami >/dev/null
gh auth status >/dev/null

pnpm check:quality
npm publish --dry-run
npm publish "$@"

published_git_head=""
for _ in {1..15}; do
  published_git_head="$(npm view "${package_name}@${version}" gitHead 2>/dev/null || true)"
  if [[ -n "$published_git_head" ]]; then
    break
  fi
  sleep 2
done

if [[ -z "$published_git_head" ]]; then
  echo "error: could not verify npm gitHead for ${package_name}@${version}"
  exit 1
fi

if [[ "$published_git_head" != "$commit" ]]; then
  echo "error: npm gitHead (${published_git_head}) does not match HEAD (${commit})"
  exit 1
fi

if git rev-parse -q --verify "refs/tags/${tag}" >/dev/null; then
  tag_commit="$(git rev-list -n 1 "${tag}")"
  if [[ "$tag_commit" != "$commit" ]]; then
    echo "error: ${tag} already exists at ${tag_commit}, expected ${commit}"
    exit 1
  fi
else
  git tag -a "${tag}" "${commit}" -m "${tag}"
fi

git push origin main
git push origin "${tag}"

if gh release view "${tag}" >/dev/null 2>&1; then
  gh release edit "${tag}" --verify-tag --title "${tag}"
else
  gh release create "${tag}" --verify-tag --title "${tag}" --generate-notes
fi

npm view "${package_name}" version dist-tags --json
gh release view "${tag}"

echo "Release complete: ${tag}"
