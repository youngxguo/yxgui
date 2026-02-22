import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import stylex from '@stylexjs/unplugin';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const storybookConfigDir = path.join(dirname, '.storybook');

export default defineConfig({
  // Vitest 4 currently types plugins against Vite 6 while this repo uses Vite 7.
  plugins: [stylex.vite({ runtimeInjection: true })] as any,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    projects: [
      {
        extends: true,
        test: {
          name: 'unit'
        }
      },
      {
        extends: true,
        plugins:
          [
            react(),
            storybookTest({
              configDir: storybookConfigDir,
              storybookScript: 'pnpm storybook --ci'
            })
          ] as any,
        optimizeDeps: {
          include: ['@stylexjs/stylex/lib/stylex-inject']
        },
        test: {
          name: `storybook:${storybookConfigDir}`,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['./.storybook/vitest.setup.ts']
        }
      }
    ]
  }
});
