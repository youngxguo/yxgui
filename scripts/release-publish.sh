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
package_version="${package_name}@${version}"

echo "Preparing release ${package_version} from ${commit}"

npm whoami >/dev/null
gh auth status >/dev/null

pnpm check:quality
npm publish --dry-run "$@"

published_version="$(npm view "$package_version" version 2>/dev/null || true)"
published_git_head=""

if [[ "$published_version" == "$version" ]]; then
  published_git_head="$(npm view "$package_version" gitHead 2>/dev/null || true)"
  if [[ "$published_git_head" == "$commit" ]]; then
    echo "${package_version} is already published from ${commit}; skipping publish"
  elif [[ -n "$published_git_head" ]]; then
    echo "error: ${package_version} is already published from ${published_git_head}, expected ${commit}"
    exit 1
  else
    echo "error: could not verify npm gitHead for ${package_version}"
    exit 1
  fi
else
  npm publish "$@"

  for _ in {1..15}; do
    published_git_head="$(npm view "$package_version" gitHead 2>/dev/null || true)"
    if [[ -n "$published_git_head" ]]; then
      break
    fi
    sleep 2
  done
fi

if [[ -z "$published_git_head" ]]; then
  echo "error: could not verify npm gitHead for ${package_version}"
  exit 1
fi

if [[ "$published_git_head" != "$commit" ]]; then
  echo "error: npm gitHead (${published_git_head}) does not match HEAD (${commit})"
  exit 1
fi

if git rev-parse -q --verify "refs/tags/${tag}" >/dev/null; then
  tag_commit="$(git rev-list -n 1 "$tag")"
  if [[ "$tag_commit" != "$commit" ]]; then
    echo "error: ${tag} already exists at ${tag_commit}, expected ${commit}"
    exit 1
  fi
else
  git tag -a "$tag" "$commit" -m "$tag"
fi

git push origin "$tag"

if gh release view "$tag" >/dev/null 2>&1; then
  echo "GitHub release ${tag} already exists; skipping creation"
else
  gh release create "$tag" --verify-tag --title "$tag" --generate-notes
fi

npm view "$package_version" version gitHead dist-tags --json
gh release view "$tag"

echo "Release complete: ${tag}"
