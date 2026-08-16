import stylex from '@stylexjs/unplugin';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [stylex.rollup()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    exclude: [...configDefaults.exclude, 'tests/screenshots/**']
  }
});
