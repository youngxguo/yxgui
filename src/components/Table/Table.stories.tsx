import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { spacingTokens } from '../../theme/tokens.stylex';
import { Typography } from '../Typography/Typography';
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

const meta = {
  title: 'Content/Table',
  component: Table,
  tags: ['autodocs']
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent invoices and payment status.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Invoice</TableHead>
          <TableHead scope="col">Customer</TableHead>
          <TableHead scope="col">Status</TableHead>
          <TableHead scope="col" style={{ textAlign: 'right' }}>
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV-001</TableCell>
          <TableCell>Acme Co</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell style={{ textAlign: 'right' }}>$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV-002</TableCell>
          <TableCell>Northwind</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell style={{ textAlign: 'right' }}>$125.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell style={{ textAlign: 'right' }}>$375.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole('table')).toBeInTheDocument();
    expect(canvas.getByRole('columnheader', { name: 'Invoice' })).toBeInTheDocument();
    expect(canvas.getByRole('cell', { name: 'Pending' })).toBeInTheDocument();
    expect(canvas.getByText('Recent invoices and payment status.')).toBeInTheDocument();
  }
};

export const DenseRows: Story = {
  render: () => {
    const denseCellStyle = {
      padding: `${spacingTokens.xs} ${spacingTokens.md}`
    } as const;

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col" style={denseCellStyle}>
              Event
            </TableHead>
            <TableHead scope="col" style={denseCellStyle}>
              Actor
            </TableHead>
            <TableHead scope="col" style={denseCellStyle}>
              Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell style={denseCellStyle}>Deploy started</TableCell>
            <TableCell style={denseCellStyle}>ci-bot</TableCell>
            <TableCell style={denseCellStyle}>12:10</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={denseCellStyle}>Deploy finished</TableCell>
            <TableCell style={denseCellStyle}>ci-bot</TableCell>
            <TableCell style={denseCellStyle}>12:12</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={denseCellStyle}>Rollback test</TableCell>
            <TableCell style={denseCellStyle}>ops</TableCell>
            <TableCell style={denseCellStyle}>12:16</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
};

export const CaptionAndEmptyState: Story = {
  render: () => (
    <Table>
      <TableCaption>No matching rows for the current filters.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Name</TableHead>
          <TableHead scope="col">Role</TableHead>
          <TableHead scope="col">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3}>
            <Typography variant="muted">No results found. Try clearing filters.</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
};
