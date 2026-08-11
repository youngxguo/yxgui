# Releasing

Releases are published locally from a reviewed commit on `main`.

1. Open and merge a dedicated PR that updates the version in `package.json`. Do not publish or create the version tag from that PR.
2. Update a clean local `main` and confirm authentication:

   ```sh
   git switch main
   git pull --ff-only
   git status --short
   npm whoami
   gh auth status
   ```

3. Publish the release:

   ```sh
   pnpm release:publish
   ```

The command runs the complete quality gate and production build, performs an npm dry run, publishes and verifies the package, pushes the annotated `v<version>` tag, and creates the GitHub release.

If the command fails after publishing, rerun it. An existing package from the current commit is reused so the tag or GitHub release can be repaired. The command stops if the package version or version tag belongs to another commit.

Pass npm options after `--` when needed, for example:

```sh
pnpm release:publish -- --otp <code>
```
