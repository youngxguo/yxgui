import { defineConfig } from 'vitest/config';
import stylex from '@stylexjs/unplugin';
import { createStorybookProject, storybookCoverage } from './vitest.shared';

export default defineConfig({
  plugins: [stylex.vite({ runtimeInjection: true })],
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
      createStorybookProject()
    ]
  }
});
