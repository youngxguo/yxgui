import { defineConfig } from 'vitest/config';
import { createStorybookProject, storybookCoverage } from './vitest.shared';

export default defineConfig({
  test: {
    coverage: storybookCoverage,
    projects: [
      createStorybookProject({
        includeStylexPlugin: true,
        storybookScript: 'pnpm storybook --ci'
      })
    ]
  }
});
