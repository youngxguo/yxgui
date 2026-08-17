import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ActionRow } from './ActionRow';

const meta = {
  title: 'Components/ActionRow',
  component: ActionRow
} satisfies Meta<typeof ActionRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Responsive: Story = {
  render: () => (
    <ActionRow>
      <Button type="button" variant="secondary">
        Cancel
      </Button>
      <Button type="button">Save changes</Button>
    </ActionRow>
  )
};

export const SpaceBetween: Story = {
  args: { align: 'space-between', stack: 'never' },
  render: (args) => (
    <ActionRow {...args}>
      <Button type="button" variant="danger">
        Delete
      </Button>
      <Button type="button">Publish</Button>
    </ActionRow>
  )
};
