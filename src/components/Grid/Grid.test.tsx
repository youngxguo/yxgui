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
    expect(grid).toHaveAttribute('data-align-content', 'stretch');
    expect(grid).toHaveAttribute('data-justify-content', 'stretch');
    expect(grid).toHaveAttribute('data-auto-flow', 'row');
    expect(grid).not.toHaveAttribute('data-inline');
  });

  it('supports token-backed gap, rowGap, and columnGap styles', () => {
    render(<Grid data-testid="grid" gap="lg" rowGap="md" columnGap="xl" />);

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({ gap: '0.75rem', rowGap: '0.625rem', columnGap: '1rem' });
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

  it('supports raw template and auto track values', () => {
    render(
      <Grid
        data-testid="grid"
        columns="2fr 1fr"
        rows="auto auto"
        autoRows="minmax(4rem, auto)"
        autoColumns="12rem"
        areas='"hero side" "table side"'
      />
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({
      gridTemplateColumns: '2fr 1fr',
      gridTemplateRows: 'auto auto',
      gridAutoRows: 'minmax(4rem, auto)',
      gridAutoColumns: '12rem',
      gridTemplateAreas: '"hero side" "table side"'
    });
  });

  it('updates class composition when alignment and autoFlow change', () => {
    const { rerender } = render(
      <Grid data-testid="grid" align="stretch" justify="stretch" autoFlow="row" />
    );

    const grid = screen.getByTestId('grid');
    const baseClassName = grid.className;

    rerender(<Grid data-testid="grid" align="center" justify="end" autoFlow="column-dense" />);

    expect(grid.className).not.toEqual(baseClassName);
    expect(grid).toHaveAttribute('data-align', 'center');
    expect(grid).toHaveAttribute('data-justify', 'end');
    expect(grid).toHaveAttribute('data-auto-flow', 'column-dense');
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

  it('lets inline style overrides win over token spacing and templates', () => {
    render(
      <Grid
        data-testid="grid"
        columns={3}
        gap="sm"
        padding="sm"
        style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '3rem', padding: '2rem' }}
      />
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '3rem',
      padding: '2rem'
    });
  });
});
