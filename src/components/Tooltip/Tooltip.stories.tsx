import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    content: 'Helpful context',
    openDelay: 0
  }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Helpful context',
    openDelay: 0,
    children: <button type="button">Hover or focus me</button>
  },
  render: (args) => (
    <div style={{ padding: 32 }}>
      <Tooltip {...args}>{args.children}</Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole('button', { name: 'Hover or focus me' }));
    expect(await within(document.body).findByRole('tooltip')).toBeInTheDocument();
  }
};
