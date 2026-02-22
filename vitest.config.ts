import { defineConfig } from 'vitest/config';
import stylex from '@stylexjs/unplugin';
import { storybookCoverage } from './vitest.coverage';

export default defineConfig({
  plugins: [stylex.vite({ runtimeInjection: true })],
  test: {
    globals: true,
    environment: 'jsdom',
    teardownTimeout: 1000,
    setupFiles: ['./src/test/setup.ts'],
    coverage: storybookCoverage,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit'
        }
      }
    ]
  }
});
