import * as stylex from '@stylexjs/stylex';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import type { PropsWithChildren } from 'react';
import { Theme } from '../src/components/Theme';
import { colors } from '../src/theme/colors.stylex';
import { spacing } from '../src/theme/foundations.stylex';
import '../src/styles.css';

type StorybookTheme = {
  mode: 'light' | 'dark';
};

const themes = {
  light: { mode: 'light' },
  dark: { mode: 'dark' }
} satisfies Record<string, StorybookTheme>;

const styles = stylex.create({
  canvas: {
    backgroundColor: colors.surface,
    boxSizing: 'border-box',
    minHeight: '100vh',
    padding: spacing.lg
  }
});

function ThemeProvider({ children, theme }: PropsWithChildren<{ theme: StorybookTheme }>) {
  return (
    <Theme mode={theme.mode}>
      <div {...stylex.props(styles.canvas)}>{children}</div>
    </Theme>
  );
}

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider({
      themes,
      defaultTheme: 'light',
      Provider: ThemeProvider
    })
  ],
  parameters: {
    layout: 'fullscreen'
  }
};

export default preview;
