import type { Meta, StoryObj } from '@storybook/react-vite';
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
  title: 'Components/Table',
  component: Table,
  render: () => (
    <Table>
      <TableCaption>Workspace usage for August 2026.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Workspace</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead numeric>Members</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell>Alex Morgan</TableCell>
          <TableCell numeric>24</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Research</TableCell>
          <TableCell>Sam Lee</TableCell>
          <TableCell numeric>12</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Operations</TableCell>
          <TableCell>Jordan Kim</TableCell>
          <TableCell numeric>8</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell numeric>44</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
