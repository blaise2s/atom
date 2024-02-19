import { withoutVitePlugins } from '@storybook/builder-vite';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../lib/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  viteFinal: async (config) => {
    return {
      ...config,
      plugins: await withoutVitePlugins(config.plugins, [
        'vite:lib-inject-css',
      ]),
    };
  },
};
export default config;
