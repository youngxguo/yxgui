import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious
} from './Pagination';

describe('Pagination', () => {
  it('marks the current page within a labeled navigation region', () => {
    render(
      <Pagination>
        <PaginationList>
          <PaginationItem>
            <PaginationPrevious href="#previous" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis data-testid="ellipsis" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#next" />
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
    expect(screen.getByRole('link', { name: 'Previous page' })).toHaveAttribute(
      'href',
      '#previous'
    );
    expect(screen.getByRole('link', { name: 'Next page' })).toHaveAttribute('href', '#next');
    expect(screen.getByTestId('ellipsis')).toHaveAttribute('aria-hidden', 'true');
  });
});
