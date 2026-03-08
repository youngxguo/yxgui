import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider', () => {
  it('defaults to light theme and applies dark theme classes when requested', () => {
    const { rerender } = render(
      <ThemeProvider data-testid="theme-root">
        <div>Content</div>
      </ThemeProvider>
    );

    const root = screen.getByTestId('theme-root');
    const lightClassName = root.className;

    expect(root).toHaveAttribute('data-theme', 'light');

    rerender(
      <ThemeProvider data-testid="theme-root" theme="dark">
        <div>Content</div>
      </ThemeProvider>
    );

    expect(root).toHaveAttribute('data-theme', 'dark');
    expect(root.className).not.toEqual(lightClassName);
  });

  it('merges consumer className/style and forwards native props', () => {
    render(
      <ThemeProvider
        aria-label="App shell"
        className="app-shell"
        data-testid="theme-root"
        style={{ minHeight: 720 }}
        theme="dark"
      >
        <div>Child</div>
      </ThemeProvider>
    );

    const root = screen.getByTestId('theme-root');
    expect(root).toHaveAttribute('aria-label', 'App shell');
    expect(root.className).toContain('app-shell');
    expect(root).toHaveStyle({ minHeight: '720px' });
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ThemeProvider ref={ref}>Themed</ThemeProvider>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
