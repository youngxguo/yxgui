import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import stylex from '@stylexjs/unplugin';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export const storybookConfigDir = path.join(dirname, '.storybook');

export const storybookCoverage = {
  provider: 'v8' as const,
  reporter: ['text', 'html'],
  include: ['src/components/**/*.{ts,tsx}'],
  exclude: ['src/**/*.stories.*', 'src/**/*.test.*', 'src/test/**', 'storybook-static/**']
};

interface StorybookProjectOptions {
  includeStylexPlugin?: boolean;
  storybookScript?: string;
}

export function createStorybookProject({
  includeStylexPlugin = false,
  storybookScript
}: StorybookProjectOptions = {}) {
  return {
    extends: true as const,
    plugins: [
      ...(includeStylexPlugin ? [stylex.vite({ runtimeInjection: true })] : []),
      react(),
      storybookTest({
        configDir: storybookConfigDir,
        ...(storybookScript ? { storybookScript } : {})
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
        instances: [{ browser: 'chromium' as const }]
      },
      setupFiles: ['./.storybook/vitest.setup.ts']
    }
  };
}
