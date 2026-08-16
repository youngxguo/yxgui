import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Grid, GridItem } from './Grid';

describe('Grid', () => {
  it('preserves native grid and item props and refs', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Grid aria-label="Projects" columns={3} ref={ref}>
        <GridItem data-testid="featured" columnSpan={2}>
          Featured
        </GridItem>
      </Grid>
    );

    expect(screen.getByLabelText('Projects')).toBe(ref.current);
    expect(screen.getByTestId('featured')).toHaveTextContent('Featured');
  });
});
