import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { createTheme, darkTheme, lightTheme, ThemeProvider } from './theme';

describe('createTheme', () => {
  it('merges semantic overrides with the default theme', () => {
    const theme = createTheme({
      color: { accent: '#006adc' },
      control: { radius: '999px' }
    });

    expect(theme.color.accent).toBe('#006adc');
    expect(theme.color.canvas).toBe(lightTheme.color.canvas);
    expect(theme.control.radius).toBe('999px');
    expect(theme.control.height).toBe(lightTheme.control.height);
  });

  it('provides a complete dark theme', () => {
    expect(darkTheme.color.canvas).toBe('#171716');
    expect(darkTheme.typography).toEqual(lightTheme.typography);
    expect(darkTheme.motion).toEqual(lightTheme.motion);
  });
});

describe('ThemeProvider', () => {
  it('scopes semantic theme values to its element subtree', () => {
    const theme = createTheme({ color: { accent: '#006adc' } });
    const markup = renderToStaticMarkup(
      <ThemeProvider theme={theme} id="custom-theme">
        <Button>Save</Button>
      </ThemeProvider>
    );

    expect(markup).toContain('<div id="custom-theme" data-yxgui-theme=""');
    expect(markup).toContain('--yxg-color-accent:#006adc');
    expect(markup).toContain('--yxg-control-height:2.75rem');
    expect(markup).toContain('<button');
  });

  it('preserves ordinary element props and consumer styles', () => {
    const markup = renderToStaticMarkup(
      <ThemeProvider className="app-shell" style={{ minHeight: '100vh' }} theme={darkTheme}>
        Content
      </ThemeProvider>
    );

    expect(markup).toContain('class="app-shell"');
    expect(markup).toContain('min-height:100vh');
    expect(markup).toContain('--yxg-color-canvas:#171716');
  });
});
