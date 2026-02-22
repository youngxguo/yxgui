import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import stylex from '@stylexjs/unplugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const storybookConfigDir = path.join(dirname, '.storybook');

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          stylex.vite({ runtimeInjection: true }),
          react(),
          storybookTest({
            configDir: storybookConfigDir,
            storybookScript: 'pnpm storybook --ci'
          })
        ],
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
