import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { createTheme, darkTheme, defaultTheme, ThemeProvider } from './theme';

describe('createTheme', () => {
  it('resolves deep semantic overrides against the default theme', () => {
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

    expect(theme.color.background.canvas).toBe('#f8fafc');
    expect(theme.color.background.surface).toBe(defaultTheme.color.background.surface);
    expect(theme.color.accent.solid).toBe('#006adc');
    expect(theme.color.accent.solidHover).toBe(defaultTheme.color.accent.solidHover);
    expect(theme.typography.label.fontWeight).toBe(700);
    expect(theme.typography.label.fontFamily).toBe(defaultTheme.typography.label.fontFamily);
    expect(theme.control.gap).toBe('0.75rem');
    expect(theme.radius.control).toBe('999px');
    expect(theme.opacity.disabled).toBe('0.4');
  });

  it('exports complete built-in theme presets', () => {
    expect(darkTheme.color.background.canvas).toBe('#0a0a0a');
    expect(darkTheme.color.background.raised).toBe('#262626');
    expect(darkTheme.color.accent.solidPressed).toBe('#a3a3a3');
    expect(darkTheme.color.danger.border).toBe('#ef4444');
    expect(darkTheme.typography).toEqual(defaultTheme.typography);
    expect(darkTheme.motion).toEqual(defaultTheme.motion);
  });
});

describe('ThemeProvider', () => {
  it('scopes a complete semantic theme to its element subtree', () => {
    const theme = createTheme({
      color: { accent: { solid: '#006adc', solidPressed: '#004f9e' } },
      typography: { label: { fontWeight: 700 } },
      opacity: { disabled: '0.4' }
    });
    const markup = renderToStaticMarkup(
      <ThemeProvider theme={theme} id="custom-theme">
        <Button>Save</Button>
      </ThemeProvider>
    );

    expect(markup).toContain('<div id="custom-theme" data-yxgui-theme=""');
    expect(markup).toContain('--yxg-color-accent-solid:#006adc');
    expect(markup).toContain('--yxg-color-accent-solid-pressed:#004f9e');
    expect(markup).toContain('--yxg-font-label-weight:700');
    expect(markup).toContain('--yxg-opacity-disabled:0.4');
    expect(markup).toContain(`--yxg-control-height:${defaultTheme.control.height}`);
    expect(new Set(markup.match(/--yxg-[\w-]+(?=:)/g))).toHaveLength(52);
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
    expect(markup).toContain('--yxg-color-background-canvas:#0a0a0a');
  });

  it('applies the default theme when no theme is supplied', () => {
    const markup = renderToStaticMarkup(<ThemeProvider>Content</ThemeProvider>);

    expect(markup).toContain(`--yxg-color-accent-solid:${defaultTheme.color.accent.solid}`);
    expect(markup).toContain(`--yxg-radius-control:${defaultTheme.radius.control}`);
  });
});
