import { defineConfig } from 'vitest/config';
import { storybookCoverage } from './vitest.coverage';
import { createStorybookProject } from './vitest.shared';

export default defineConfig({
  test: {
    coverage: storybookCoverage,
    projects: [
      createStorybookProject({
        storybookScript: 'pnpm storybook --ci'
      })
    ]
  }
});
