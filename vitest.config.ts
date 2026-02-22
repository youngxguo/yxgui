import { defineConfig } from 'vitest/config';
import stylex from '@stylexjs/unplugin';
import { storybookCoverage } from './vitest.coverage';

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
      }
    ]
  }
});
