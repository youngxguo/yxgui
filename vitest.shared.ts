import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export const storybookConfigDir = path.join(dirname, '.storybook');

interface StorybookProjectOptions {
  storybookScript?: string;
}

export function createStorybookProject({ storybookScript }: StorybookProjectOptions = {}) {
  return {
    extends: true as const,
    plugins: [
      react(),
      storybookTest({
        configDir: storybookConfigDir,
        ...(storybookScript ? { storybookScript } : {})
      })
    ],
    test: {
      name: `storybook:${storybookConfigDir}`,
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({}),
        instances: [{ browser: 'chromium' as const }]
      },
      setupFiles: ['./.storybook/vitest.setup.ts']
    }
  };
}
