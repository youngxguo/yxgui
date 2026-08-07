import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-themes'],
  framework: '@storybook/react-vite',
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = viteConfig.plugins?.filter(
      (plugin) =>
        plugin && !Array.isArray(plugin) && (!('name' in plugin) || plugin.name !== 'vite:dts')
    );

    return viteConfig;
  }
};

export default config;
