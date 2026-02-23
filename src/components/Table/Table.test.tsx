import { render, screen, within } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from './Table';

describe('Table', () => {
  it('renders semantic table markup with headers, cells, footer, and caption', () => {
    render(
      <Table>
        <TableCaption>Invoice summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Invoice</TableHead>
            <TableHead scope="col">Status</TableHead>
            <TableHead scope="col">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>$125.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>$125.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const table = screen.getByRole('table');
    expect(within(table).getByRole('columnheader', { name: 'Invoice' })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
    expect(within(table).getByRole('cell', { name: 'Paid' })).toBeInTheDocument();
    expect(screen.getByText('Invoice summary')).toBeInTheDocument();
    expect(within(table).getByText('Total')).toBeInTheDocument();
  });

  it('forwards native props to root and subcomponents', () => {
    render(
      <Table data-testid="orders-table" aria-label="Orders">
        <TableBody>
          <TableRow data-testid="row-1" title="First row">
            <TableCell data-testid="cell-1">Row value</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByTestId('orders-table')).toHaveAttribute('aria-label', 'Orders');
    expect(screen.getByTestId('row-1')).toHaveAttribute('title', 'First row');
    expect(screen.getByTestId('cell-1')).toHaveTextContent('Row value');
  });

  it('accepts ref props for root and slots', () => {
    const tableRef = createRef<HTMLTableElement>();
    const headerCellRef = createRef<HTMLTableCellElement>();

    render(
      <Table ref={tableRef}>
        <TableHeader>
          <TableRow>
            <TableHead ref={headerCellRef}>Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    expect(tableRef.current).toBeInstanceOf(HTMLTableElement);
    expect(headerCellRef.current).toBeInstanceOf(HTMLTableCellElement);
  });
});
