import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { ThemeRoot } from './ThemeRoot';

describe('ThemeRoot', () => {
  it('defaults to light theme and applies dark theme classes when requested', () => {
    const { rerender } = render(
      <ThemeRoot data-testid="theme-root">
        <div>Content</div>
      </ThemeRoot>
    );

    const root = screen.getByTestId('theme-root');
    const lightClassName = root.className;

    expect(root).toHaveAttribute('data-theme', 'light');
    expect(root).toHaveStyle({ colorScheme: 'light' });

    rerender(
      <ThemeRoot data-testid="theme-root" theme="dark">
        <div>Content</div>
      </ThemeRoot>
    );

    expect(root).toHaveAttribute('data-theme', 'dark');
    expect(root.className).not.toEqual(lightClassName);
    expect(root).toHaveStyle({ colorScheme: 'dark' });
  });

  it('merges consumer className/style and forwards native props', () => {
    render(
      <ThemeRoot
        aria-label="App shell"
        className="app-shell"
        data-testid="theme-root"
        style={{ minHeight: 720 }}
        theme="dark"
      >
        <div>Child</div>
      </ThemeRoot>
    );

    const root = screen.getByTestId('theme-root');
    expect(root).toHaveAttribute('aria-label', 'App shell');
    expect(root.className).toContain('app-shell');
    expect(root).toHaveStyle({ minHeight: '720px', colorScheme: 'dark' });
  });

  it('can opt out of color-scheme defaults', () => {
    render(
      <ThemeRoot applyColorScheme={false} data-testid="theme-root" theme="dark">
        <div>Child</div>
      </ThemeRoot>
    );

    const root = screen.getByTestId('theme-root');
    expect(root).not.toHaveStyle({ colorScheme: 'dark' });
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ThemeRoot ref={ref}>Themed</ThemeRoot>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
