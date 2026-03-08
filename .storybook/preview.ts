import type { Preview } from '@storybook/react';
import * as stylex from '@stylexjs/stylex';
import { createElement } from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { colorTokens } from '../src/theme/tokens/semanticTokens.stylex';
import type { ThemeName } from '../src/theme/themes.stylex';

const previewStyles = stylex.create({
  canvas: {
    backgroundColor: colorTokens.background,
    color: colorTokens.foreground,
    minHeight: '100vh'
  }
});

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for component previews',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ]
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as ThemeName;
      const canvasStyleProps = stylex.props(previewStyles.canvas);

      return createElement(
        ThemeProvider,
        { theme },
        createElement('div', canvasStyleProps, createElement(Story))
      );
    }
  ],
  parameters: {
    options: {
      storySort: {
        order: [
          'Foundations',
          'Actions',
          'Forms',
          'Layout',
          'Navigation',
          'Disclosure',
          'Overlays',
          'Feedback',
          'Content'
        ]
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
