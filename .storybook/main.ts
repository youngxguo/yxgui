import type { StorybookConfig } from '@storybook/react-vite';
import stylex from '@stylexjs/unplugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = viteConfig.plugins ?? [];
    viteConfig.plugins.unshift(stylex.vite({ runtimeInjection: true }));

    return viteConfig;
  },
  docs: {
    autodocs: 'tag'
  }
};

export default config;
