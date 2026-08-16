import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Empty, EmptyDescription, EmptyTitle } from './Empty';

const meta = { title: 'Components/Empty', component: Empty } satisfies Meta<typeof Empty>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>Create a project to start organizing your work.</EmptyDescription>
      <Button>Create project</Button>
    </Empty>
  )
};
