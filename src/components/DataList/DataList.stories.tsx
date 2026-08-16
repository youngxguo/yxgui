import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import { Link } from '../Link';
import { DataList, DataListDescription, DataListItem, DataListTerm } from './DataList';

const meta = {
  title: 'Components/DataList',
  component: DataList,
  render: () => (
    <DataList aria-label="Project details">
      <DataListItem>
        <DataListTerm>Status</DataListTerm>
        <DataListDescription>
          <Badge variant="success">Ready</Badge>
        </DataListDescription>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Repository</DataListTerm>
        <DataListDescription>
          <Link href="https://github.com/youngxguo/yxgui">youngxguo/yxgui</Link>
        </DataListDescription>
      </DataListItem>
      <DataListItem>
        <DataListTerm>Release</DataListTerm>
        <DataListDescription>1.0.0</DataListDescription>
      </DataListItem>
    </DataList>
  )
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
