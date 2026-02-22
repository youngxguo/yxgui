import type { Preview } from '@storybook/react';
import { createElement } from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { defaultTheme } from '../src/theme/defaultTheme';

const preview: Preview = {
  decorators: [
    (Story) => createElement(ThemeProvider, { theme: defaultTheme }, createElement(Story))
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
