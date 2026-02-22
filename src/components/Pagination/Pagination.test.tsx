import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './Pagination';

describe('Pagination', () => {
  it('renders navigation semantics and active page state', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" aria-disabled="true" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#3" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /previous/i })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
    expect(screen.getByRole('link', { name: /next/i })).toBeInTheDocument();
  });

  it('renders ellipsis helper', () => {
    render(<PaginationEllipsis data-testid="ellipsis" />);
    expect(screen.getByTestId('ellipsis')).toHaveTextContent('...');
    expect(screen.getByTestId('ellipsis')).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards custom labels and props', () => {
    render(<Pagination aria-label="Results pages" data-testid="nav" />);
    expect(screen.getByTestId('nav')).toHaveAttribute('aria-label', 'Results pages');
  });
});
