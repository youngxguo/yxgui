import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Empty, EmptyDescription, EmptyTitle } from './Empty';

describe('Empty', () => {
  it('provides semantic compound parts', () => {
    render(
      <Empty aria-labelledby="empty-title">
        <EmptyTitle id="empty-title">No results</EmptyTitle>
        <EmptyDescription>Try another query.</EmptyDescription>
      </Empty>
    );
    expect(screen.getByRole('region', { name: 'No results' })).toBeInTheDocument();
    expect(screen.getByText('Try another query.')).toBeInTheDocument();
  });
});
