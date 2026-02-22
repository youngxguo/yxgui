import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createTheme } from './createTheme';
import { defaultTheme } from './defaultTheme';
import { ThemeProvider } from './ThemeProvider';
import { cssVarNames } from './vars.stylex';

describe('theme', () => {
  it('deep merges overrides with defaults', () => {
    const theme = createTheme({
      palette: {
        background: '#111111'
      },
      surface: {
        elevated: '#ffffff'
      },
      control: {
        placeholder: '#7a7f8a'
      },
      variants: {
        primary: {
          background: '#1f2a44'
        }
      }
    });

    expect(theme.palette.background).toBe('#111111');
    expect(theme.palette.foreground).toBe(defaultTheme.palette.foreground);
    expect(theme.surface.elevated).toBe('#ffffff');
    expect(theme.surface.base).toBe(defaultTheme.surface.base);
    expect(theme.control.placeholder).toBe('#7a7f8a');
    expect(theme.control.border).toBe(defaultTheme.control.border);
    expect(theme.variants.primary.background).toBe('#1f2a44');
    expect(theme.variants.secondary.background).toBe(defaultTheme.variants.secondary.background);
  });

  it('applies theme variables to document root', () => {
    const theme = createTheme({
      palette: {
        foreground: '#0b0f19'
      },
      border: {
        focus: '#3a63ff'
      }
    });

    render(
      <ThemeProvider theme={theme}>
        <div>Child</div>
      </ThemeProvider>
    );

    expect(document.documentElement.style.getPropertyValue(cssVarNames.palette.foreground)).toBe(
      '#0b0f19'
    );
    expect(document.documentElement.style.getPropertyValue(cssVarNames.border.focus)).toBe(
      '#3a63ff'
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
