import stylex from '@stylexjs/unplugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [stylex.rollup()],
  test: {
    environment: 'node'
  }
});
