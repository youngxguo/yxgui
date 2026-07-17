import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { createTheme, darkTheme, lightTheme, ThemeProvider } from './theme';

describe('createTheme', () => {
  it('preserves deep sparse semantic overrides', () => {
    const theme = createTheme({
      color: {
        background: { canvas: '#f8fafc' },
        accent: { solid: '#006adc', solidPressed: '#004f9e' }
      },
      typography: { label: { fontWeight: 700 } },
      control: { gap: '0.75rem' },
      radius: { control: '999px' },
      opacity: { disabled: '0.4' }
    });

    expect(theme).toEqual({
      color: {
        background: { canvas: '#f8fafc' },
        accent: { solid: '#006adc', solidPressed: '#004f9e' }
      },
      typography: { label: { fontWeight: 700 } },
      control: { gap: '0.75rem' },
      radius: { control: '999px' },
      opacity: { disabled: '0.4' }
    });
    expect(lightTheme).toEqual({});
  });

  it('keeps the dark theme limited to complete color overrides', () => {
    expect(darkTheme.color?.background?.canvas).toBe('#171716');
    expect(darkTheme.color?.background?.raised).toBe('#32312d');
    expect(darkTheme.color?.accent?.solidPressed).toBe('#c0b6ff');
    expect(darkTheme.color?.danger?.border).toBe('#f97066');
    expect(darkTheme.typography).toBeUndefined();
    expect(darkTheme.motion).toBeUndefined();
  });
});

describe('ThemeProvider', () => {
  it('scopes only supplied semantic values to its element subtree', () => {
    const theme = createTheme({
      color: {
        background: { canvas: '#f8fafc' },
        accent: { solid: '#006adc', solidPressed: '#004f9e' }
      },
      typography: { label: { fontWeight: 700 } },
      opacity: { disabled: '0.4' }
    });
    const markup = renderToStaticMarkup(
      <ThemeProvider theme={theme} id="custom-theme">
        <Button>Save</Button>
      </ThemeProvider>
    );

    expect(markup).toContain('<div id="custom-theme" data-yxgui-theme=""');
    expect(markup).toContain('--yxg-color-background-canvas:#f8fafc');
    expect(markup).toContain('--yxg-color-accent-solid:#006adc');
    expect(markup).toContain('--yxg-color-accent-solid-pressed:#004f9e');
    expect(markup).toContain('--yxg-font-label-weight:700');
    expect(markup).toContain('--yxg-opacity-disabled:0.4');
    expect(markup).not.toContain('--yxg-control-height');
    expect(new Set(markup.match(/--yxg-[\w-]+(?=:)/g))).toHaveLength(5);
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
    expect(markup).toContain('--yxg-color-background-canvas:#171716');
    expect(markup).not.toContain('--yxg-font-body-family');
  });

  it('lets nested themes inherit values they do not override', () => {
    const markup = renderToStaticMarkup(
      <ThemeProvider theme={createTheme({ color: { accent: { solid: '#006adc' } } })}>
        <ThemeProvider theme={createTheme({ radius: { control: '999px' } })}>Content</ThemeProvider>
      </ThemeProvider>
    );

    expect(markup.match(/--yxg-color-accent-solid:/g)).toHaveLength(1);
    expect(markup.match(/--yxg-radius-control:/g)).toHaveLength(1);
  });
});
