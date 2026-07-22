import * as stylex from '@stylexjs/stylex';
import type { Preview } from '@storybook/react-vite';
import '../src/style.css';
import { darkTheme, lightTheme } from '../src/themes';
import { colors, typography } from '../src/tokens.stylex';

const styles = stylex.create({
  root: {
    backgroundColor: colors.backgroundCanvas,
    color: colors.foregroundDefault,
    fontFamily: typography.bodyFamily,
    minHeight: '100vh'
  }
});

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? darkTheme : lightTheme;

      return (
        <div {...stylex.props(theme, styles.root)}>
          <Story />
        </div>
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
