import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders as a div with default grid behavior', () => {
    render(
      <Grid data-testid="grid">
        <span>Item</span>
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid.tagName).toBe('DIV');
    expect(grid).toHaveAttribute('data-align', 'stretch');
    expect(grid).toHaveAttribute('data-justify', 'stretch');
    expect(grid).not.toHaveAttribute('data-inline');
  });

  it('supports token-backed gap styles', () => {
    render(<Grid data-testid="grid" gap="lg" />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({ gap: '0.75rem' });
  });

  it('supports token-backed padding styles', () => {
    render(<Grid data-testid="grid" padding="sm" />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({ padding: '0.5rem' });
  });

  it('maps numeric columns and rows to equal tracks', () => {
    render(<Grid data-testid="grid" columns={3} rows={2} />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gridTemplateRows: 'repeat(2, minmax(0, 1fr))'
    });
  });

  it('updates class composition when alignment changes', () => {
    const { rerender } = render(<Grid data-testid="grid" align="stretch" justify="stretch" />);

    const grid = screen.getByTestId('grid');
    const baseClassName = grid.className;

    rerender(<Grid data-testid="grid" align="center" justify="end" />);

    expect(grid.className).not.toEqual(baseClassName);
    expect(grid).toHaveAttribute('data-align', 'center');
    expect(grid).toHaveAttribute('data-justify', 'end');
  });

  it('supports semantic element overrides and ref passthrough', () => {
    const ref = createRef<HTMLElement>();

    render(
      <Grid ref={ref} as="section" data-testid="grid" inline>
        Content
      </Grid>
    );

    const grid = screen.getByTestId('grid');
    expect(grid.tagName).toBe('SECTION');
    expect(ref.current).toBe(grid);
    expect(grid).toHaveAttribute('data-inline', 'true');
  });
});
