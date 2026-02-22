import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createTheme } from './createTheme';
import { defaultTheme } from './defaultTheme';
import { ThemeProvider } from './ThemeProvider';

describe('theme', () => {
  it('deep merges overrides with defaults', () => {
    const theme = createTheme({
      palette: {
        background: '#111111'
      },
      components: {
        button: {
          primaryBackground: '#1f2a44'
        }
      }
    });

    expect(theme.palette.background).toBe('#111111');
    expect(theme.palette.foreground).toBe(defaultTheme.palette.foreground);
    expect(theme.components.button.primaryBackground).toBe('#1f2a44');
    expect(theme.components.button.secondaryBackground).toBe(
      defaultTheme.components.button.secondaryBackground
    );
  });

  it('applies theme variables to document root', () => {
    const theme = createTheme({
      palette: {
        foreground: '#0b0f19'
      }
    });

    render(
      <ThemeProvider theme={theme}>
        <div>Child</div>
      </ThemeProvider>
    );

    expect(document.documentElement.style.getPropertyValue('--yx-palette-foreground')).toBe(
      '#0b0f19'
    );
  });

  it('does not allow nested providers in development', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      <ThemeProvider>
        <ThemeProvider>
          <div>Child</div>
        </ThemeProvider>
      </ThemeProvider>
    );

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    consoleErrorSpy.mockRestore();
  });
});
