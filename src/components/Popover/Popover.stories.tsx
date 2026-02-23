import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Typography } from '../Typography/Typography';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const meta = {
  title: 'Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>
        <Typography as="h3" variant="h4">
          Workspace
        </Typography>
        <Typography as="p" variant="muted">
          Manage sharing, members, and permissions.
        </Typography>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open popover' }));
    expect(await within(document.body).findByRole('dialog')).toBeInTheDocument();
  }
};
