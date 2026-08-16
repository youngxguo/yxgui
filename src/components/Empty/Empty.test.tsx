import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from './Empty';

describe('Empty', () => {
  it('provides semantic compound parts', () => {
    render(
      <Empty aria-labelledby="empty-title">
        <EmptyHeader>
          <EmptyMedia aria-hidden="true">?</EmptyMedia>
          <EmptyTitle id="empty-title">No results</EmptyTitle>
          <EmptyDescription>Try another query.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>Search controls</EmptyContent>
      </Empty>
    );
    expect(screen.getByRole('region', { name: 'No results' })).toBeInTheDocument();
    expect(screen.getByText('Try another query.')).toBeInTheDocument();
    expect(screen.getByText('Search controls')).toBeInTheDocument();
  });
});
