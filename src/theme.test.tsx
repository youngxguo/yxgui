import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { createTheme, darkTheme, lightTheme, ThemeProvider } from './theme';

describe('createTheme', () => {
  it('preserves sparse semantic overrides', () => {
    const theme = createTheme({
      color: { accent: '#006adc' },
      control: { radius: '999px' }
    });

    expect(theme).toEqual({
      color: { accent: '#006adc' },
      control: { radius: '999px' }
    });
    expect(lightTheme).toEqual({});
  });

  it('keeps the dark theme limited to its color overrides', () => {
    expect(darkTheme.color?.canvas).toBe('#171716');
    expect(darkTheme.typography).toBeUndefined();
    expect(darkTheme.motion).toBeUndefined();
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
    expect(markup).not.toContain('--yxg-control-height');
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

  it('lets nested themes inherit values they do not override', () => {
    const markup = renderToStaticMarkup(
      <ThemeProvider theme={createTheme({ color: { accent: '#006adc' } })}>
        <ThemeProvider theme={createTheme({ control: { radius: '999px' } })}>Content</ThemeProvider>
      </ThemeProvider>
    );

    expect(markup.match(/--yxg-color-accent:/g)).toHaveLength(1);
    expect(markup.match(/--yxg-radius-control:/g)).toHaveLength(1);
  });
});
