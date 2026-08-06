import stylex from '@stylexjs/unplugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    stylex.vite(),
    react(),
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
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'cjs' ? 'index.cjs' : 'index.es.js')
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
});
