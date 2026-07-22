/// <reference types="vitest/config" />

import stylex, { type UserOptions } from '@stylexjs/unplugin';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const stylexOptions = {
  runtimeInjection: false,
  unstable_moduleResolution: {
    type: 'commonJS',
    rootDir: fileURLToPath(new URL('.', import.meta.url))
  }
} satisfies Partial<UserOptions>;

export default defineConfig(({ mode }) => {
  const isTest = mode === 'test';

  return {
    plugins: [
      isTest
        ? stylex.rollup(stylexOptions)
        : stylex.vite({
            ...stylexOptions,
            useCSSLayers: {
              before: ['yxgui.reset'],
              prefix: 'yxgui'
            }
          }),
      react(),
      ...(!isTest
        ? [
            dts({
              include: ['src'],
              exclude: [
                'src/**/*.stories.ts',
                'src/**/*.stories.tsx',
                'src/**/*.test.ts',
                'src/**/*.test.tsx'
              ],
              insertTypesEntry: true
            })
          ]
        : [])
    ],
    test: {
      environment: 'node'
    },
    build: {
      lib: {
        cssFileName: 'style',
        entry: 'src/index.ts',
        formats: ['es'],
        fileName: 'index'
      },
      rollupOptions: {
        external: [/^react(?:\/.*)?$/, /^react-dom(?:\/.*)?$/]
      }
    }
  };
});
