import * as stylex from '@stylexjs/stylex';
import { useMemo, useState, type ReactNode } from 'react';
import { colors } from '../../theme/colors.stylex';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing
} from '../../theme/foundations.stylex';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../Table';

export type DataTableSortDirection = 'ascending' | 'descending';

export type DataTableSort = {
  columnId: string;
  direction: DataTableSortDirection;
};

export type DataTableColumn<Row> = {
  cell: (row: Row) => ReactNode;
  header: ReactNode;
  id: string;
  numeric?: boolean;
  sortValue?: (row: Row) => Date | number | string | null | undefined;
};

export type DataTableProps<Row> = {
  caption?: ReactNode;
  columns: readonly DataTableColumn<Row>[];
  defaultSort?: DataTableSort;
  emptyMessage?: ReactNode;
  getRowId: (row: Row) => string;
  label: string;
  onSortChange?: (sort: DataTableSort) => void;
  rows: readonly Row[];
  sort?: DataTableSort;
};

const styles = stylex.create({
  sortButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.textMuted,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    gap: spacing.sm,
    lineHeight: lineHeights.sm,
    padding: 0,
    width: '100%'
  },
  numericSortButton: { justifyContent: 'flex-end' },
  indicator: {
    color: colors.primary,
    display: 'inline-flex',
    fontSize: fontSizes.xs,
    minWidth: '12px'
  },
  empty: {
    color: colors.textMuted,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingBlock: spacing.xl,
    textAlign: 'center'
  }
});

function compareValues(
  left: Date | number | string | null | undefined,
  right: Date | number | string | null | undefined
) {
  if (left == null && right == null) return 0;
  if (left == null) return 1;
  if (right == null) return -1;
  if (left instanceof Date && right instanceof Date) return left.getTime() - right.getTime();
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  return String(left).localeCompare(String(right), undefined, { numeric: true });
}

export function DataTable<Row>({
  caption,
  columns,
  defaultSort,
  emptyMessage = 'No rows.',
  getRowId,
  label,
  onSortChange,
  rows,
  sort
}: DataTableProps<Row>) {
  const [uncontrolledSort, setUncontrolledSort] = useState(defaultSort);
  const activeSort = sort ?? uncontrolledSort;
  const sortedRows = useMemo(() => {
    const column = columns.find(({ id }) => id === activeSort?.columnId);
    if (!activeSort || !column?.sortValue) return [...rows];

    return rows
      .map((row, index) => ({ index, row }))
      .sort((left, right) => {
        const result = compareValues(column.sortValue?.(left.row), column.sortValue?.(right.row));
        const directedResult = activeSort.direction === 'ascending' ? result : -result;
        return directedResult || left.index - right.index;
      })
      .map(({ row }) => row);
  }, [activeSort, columns, rows]);

  const changeSort = (column: DataTableColumn<Row>) => {
    if (!column.sortValue) return;
    const nextSort: DataTableSort = {
      columnId: column.id,
      direction:
        activeSort?.columnId === column.id && activeSort.direction === 'ascending'
          ? 'descending'
          : 'ascending'
    };
    if (sort === undefined) setUncontrolledSort(nextSort);
    onSortChange?.(nextSort);
  };

  return (
    <Table aria-label={label}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column) => {
            const direction = activeSort?.columnId === column.id ? activeSort.direction : undefined;
            return (
              <TableHead
                aria-sort={column.sortValue ? (direction ?? 'none') : undefined}
                key={column.id}
                numeric={column.numeric}
              >
                {column.sortValue ? (
                  <button
                    type="button"
                    onClick={() => changeSort(column)}
                    {...stylex.props(styles.sortButton, column.numeric && styles.numericSortButton)}
                  >
                    {column.header}
                    <span aria-hidden="true" {...stylex.props(styles.indicator)}>
                      {direction === 'ascending' ? '▲' : direction === 'descending' ? '▼' : '↕'}
                    </span>
                  </button>
                ) : (
                  column.header
                )}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedRows.map((row) => (
          <TableRow key={getRowId(row)}>
            {columns.map((column) => (
              <TableCell key={column.id} numeric={column.numeric}>
                {column.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {sortedRows.length === 0 && (
          <TableRow>
            <td colSpan={columns.length} {...stylex.props(styles.empty)}>
              {emptyMessage}
            </td>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
