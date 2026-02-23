import { defineConfig } from 'vitest/config';
import stylex from '@stylexjs/unplugin';
import { storybookCoverage } from './vitest.coverage';
import { createStorybookProject } from './vitest.shared';

const stylexVitestPlugin = stylex.vite({ runtimeInjection: true, devMode: 'off' });
// `@stylexjs/unplugin` starts a Vite dev-server interval that Vitest doesn't fully
// clean up. `devMode: 'off'` removes that hook, and overriding `apply` keeps the
// StyleX Babel transform active for unit tests.
stylexVitestPlugin.apply = () => true;

export default defineConfig({
  plugins: [stylexVitestPlugin],
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
        includeStylexPlugin: true,
        storybookScript: 'pnpm storybook --ci'
      })
    ]
  }
});
