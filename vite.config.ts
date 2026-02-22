import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import stylex from '@stylexjs/unplugin';
import dts from 'vite-plugin-dts';

const isStorybook = process.argv.some((arg: string) => arg.includes('storybook'));

export default defineConfig({
  plugins: isStorybook
    ? [stylex.vite({ runtimeInjection: true }), react()]
    : [
        stylex.vite({ runtimeInjection: true }),
        react(),
        dts({
          include: ['src'],
          exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/test/**'],
          insertTypesEntry: true
        })
      ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
});
