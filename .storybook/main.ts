import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    defaultName: 'Documentation'
  },
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = viteConfig.plugins?.filter(
      (plugin) => plugin && !Array.isArray(plugin) && plugin.name !== 'vite:dts'
    );

    return viteConfig;
  }
};

export default config;
