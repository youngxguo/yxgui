import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Switch } from './Switch';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Enable updates',
    size: 'md',
    onCheckedChange: fn()
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md']
    }
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('switch', { name: 'Enable updates' });

    await userEvent.click(control);
    expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
      <Switch aria-label="Small" size="sm" />
      <Switch aria-label="Medium" size="md" defaultChecked />
    </div>
  )
};
