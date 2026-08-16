import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './Table';

describe('Table', () => {
  it('uses native table semantics and sensible column scopes', () => {
    render(
      <Table>
        <TableCaption>Members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead numeric>Seats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alex</TableCell>
            <TableCell numeric>3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole('table', { name: 'Members' })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getByRole('columnheader', { name: 'Seats' })).toHaveAttribute('scope', 'col');
    expect(screen.getAllByRole('cell')).toHaveLength(2);
  });

  it('forwards native table refs and attributes', () => {
    const ref = createRef<HTMLTableElement>();
    render(<Table aria-label="Usage" data-testid="table" ref={ref} />);

    expect(ref.current).toBe(screen.getByTestId('table'));
    expect(ref.current).toHaveAttribute('aria-label', 'Usage');
  });
});
