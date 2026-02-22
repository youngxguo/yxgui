import { defineConfig } from 'vitest/config';
import stylex from '@stylexjs/unplugin';

export default defineConfig({
  plugins: [stylex.vite({ runtimeInjection: true })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
});
