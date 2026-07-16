import stylex from '@stylexjs/unplugin';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    stylex.rollup({
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: fileURLToPath(new URL('.', import.meta.url))
      }
    }),
    react()
  ],
  test: {
    environment: 'node'
  }
});
