import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataTable, type DataTableColumn } from './DataTable';

type Member = { id: string; name: string; seats: number };
const rows: Member[] = [
  { id: 'alex', name: 'Alex', seats: 12 },
  { id: 'sam', name: 'Sam', seats: 4 }
];
const columns: DataTableColumn<Member>[] = [
  { cell: (row) => row.name, header: 'Name', id: 'name', sortValue: (row) => row.name },
  {
    cell: (row) => row.seats,
    header: 'Seats',
    id: 'seats',
    numeric: true,
    sortValue: (row) => row.seats
  }
];

describe('DataTable', () => {
  it('sorts rows with stable native table semantics', () => {
    render(<DataTable columns={columns} getRowId={(row) => row.id} label="Members" rows={rows} />);
    const table = screen.getByRole('table', { name: 'Members' });
    fireEvent.click(screen.getByRole('button', { name: /Seats/ }));
    expect(within(table).getAllByRole('row')[1]).toHaveTextContent('Sam4');
    expect(screen.getByRole('columnheader', { name: /Seats/ })).toHaveAttribute(
      'aria-sort',
      'ascending'
    );
    fireEvent.click(screen.getByRole('button', { name: /Seats/ }));
    expect(within(table).getAllByRole('row')[1]).toHaveTextContent('Alex12');
  });

  it('reports controlled sort changes without mutating the supplied order', () => {
    const onSortChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        getRowId={(row) => row.id}
        label="Members"
        onSortChange={onSortChange}
        rows={rows}
        sort={{ columnId: 'name', direction: 'ascending' }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Name/ }));
    expect(onSortChange).toHaveBeenCalledWith({ columnId: 'name', direction: 'descending' });
    expect(screen.getAllByRole('row')[1]).toHaveTextContent('Alex12');
  });
});
