export const storybookCoverage = {
  provider: 'v8' as const,
  reporter: ['text', 'html'],
  include: ['src/components/**/*.{ts,tsx}'],
  exclude: ['src/**/*.stories.*', 'src/**/*.test.*', 'src/test/**', 'storybook-static/**']
};
