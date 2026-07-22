import type { Preview } from '@storybook/react-vite';
import { darkTheme, defaultTheme, ThemeProvider } from '../src/theme';
import '../src/style.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? darkTheme : defaultTheme;

      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    }
  ],
  globalTypes: {
    theme: {
      description: 'Theme applied to the component preview',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ]
      }
    }
  },
  initialGlobals: {
    theme: 'light'
  },
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
