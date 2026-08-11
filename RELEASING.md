# Releasing

Releases are published locally from a reviewed commit on `main`.

1. Open and merge a dedicated PR that updates the package version. Do not publish or create the version tag from that PR.
2. Update a clean local `main` and confirm npm and GitHub authentication.
3. Run the local release script.

The script runs the complete quality gate, performs a dry run, publishes and verifies the package, pushes the version tag, and creates the GitHub release.

If a release stops partway through, rerun the script. It continues when the package was published from the current commit and stops if the package version or version tag belongs to another commit.
