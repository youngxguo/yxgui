import stylex from '@stylexjs/unplugin';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    stylex.vite({
      unstable_moduleResolution: {
        type: 'commonJS',
        rootDir: fileURLToPath(new URL('.', import.meta.url))
      },
      useCSSLayers: {
        before: ['yxgui.reset'],
        prefix: 'yxgui'
      }
    }),
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/tokens.stylex.ts'],
      insertTypesEntry: true
    })
  ],
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
});
