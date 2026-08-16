import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { MailIcon } from '../Icon';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from './Empty';

const meta = { title: 'Components/Empty', component: Empty } satisfies Meta<typeof Empty>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MailIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>Create a project to start organizing your work.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create project</Button>
        <Button variant="secondary">Import project</Button>
      </EmptyContent>
    </Empty>
  )
};

export const WithAvatar: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Avatar alt="Avery Stone" size="lg" />
        </EmptyMedia>
        <EmptyTitle>Avery is offline</EmptyTitle>
        <EmptyDescription>Leave a message and they can respond later.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Leave message</Button>
      </EmptyContent>
    </Empty>
  )
};
