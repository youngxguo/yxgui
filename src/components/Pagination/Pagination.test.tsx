import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Pagination, PaginationItem, PaginationLink, PaginationList } from './Pagination';

describe('Pagination', () => {
  it('marks the current page within a labeled navigation region', () => {
    render(
      <Pagination>
        <PaginationList>
          <PaginationItem>
            <PaginationLink href="#1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink current href="#2">
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationList>
      </Pagination>
    );
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('aria-current', 'page');
  });
});
