import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, type DataTableColumn } from './DataTable';

type Workspace = { id: string; members: number; name: string; owner: string };
const columns: DataTableColumn<Workspace>[] = [
  { cell: (row) => row.name, header: 'Workspace', id: 'name', sortValue: (row) => row.name },
  { cell: (row) => row.owner, header: 'Owner', id: 'owner', sortValue: (row) => row.owner },
  {
    cell: (row) => row.members,
    header: 'Members',
    id: 'members',
    numeric: true,
    sortValue: (row) => row.members
  }
];
const rows: Workspace[] = [
  { id: 'product', members: 24, name: 'Product', owner: 'Alex Morgan' },
  { id: 'research', members: 12, name: 'Research', owner: 'Sam Lee' },
  { id: 'operations', members: 8, name: 'Operations', owner: 'Jordan Kim' }
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable<Workspace>,
  args: {
    caption: 'Workspace usage for August 2026.',
    columns,
    defaultSort: { columnId: 'members', direction: 'descending' },
    getRowId: (row) => row.id,
    label: 'Workspace usage',
    rows
  }
} satisfies Meta<typeof DataTable<Workspace>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { rows: [] } };
