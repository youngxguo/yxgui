import type { Preview } from '@storybook/react';
import { defaultTheme } from '../src/theme/defaultTheme';
import { themeToCSSVariables } from '../src/theme/cssVariables';

function applyStorybookDefaultTheme() {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  const variables = themeToCSSVariables(defaultTheme);

  for (const [name, value] of Object.entries(variables)) {
    root.style.setProperty(name, String(value));
  }
}

applyStorybookDefaultTheme();

const preview: Preview = {
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
