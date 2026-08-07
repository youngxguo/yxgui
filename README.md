# yxgui

## Screenshot tests

The screenshot suite builds Storybook and compares every story in both light and dark themes with its committed baseline.

Install Chromium once after installing dependencies:

```sh
pnpm test:screenshots:install
```

Run the suite locally:

```sh
pnpm test:screenshots
```

After an intentional visual change, review the result and update the baselines:

```sh
pnpm test:screenshots:update
```

The CI quality-check job installs Chromium, runs the same suite, and uploads the Playwright report and diffs when it fails.
