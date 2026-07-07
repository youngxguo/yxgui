import { defineConfig } from 'vitest/config';
import { storybookCoverage } from './vitest.coverage';
import { createStorybookProject } from './vitest.shared';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: storybookCoverage,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit'
        }
      },
      // Storybook's @storybook/addon-vitest "Run tests" UI only auto-discovers
      // Storybook test projects from standard Vitest config filenames.
      createStorybookProject({
        storybookScript: 'pnpm storybook --ci'
      })
    ]
  }
});
