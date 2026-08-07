import stylex from '@stylexjs/unplugin';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [stylex.rollup()],
  test: {
    environment: 'node',
    exclude: [...configDefaults.exclude, 'tests/screenshots/**']
  }
});
