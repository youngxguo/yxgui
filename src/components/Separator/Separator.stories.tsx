import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Separator } from './Separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
    decorative: false
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  }
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Separator />,
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole('separator');

    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  }
};

export const InList: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
      <div>Profile</div>
      <Separator decorative />
      <div>Notifications</div>
      <Separator decorative />
      <div>Billing</div>
    </div>
  )
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical'
  },
  render: () => (
    <div style={{ alignItems: 'stretch', display: 'flex', gap: '0.75rem', height: 32 }}>
      <Button size="sm" variant="ghost">
        Back
      </Button>
      <Separator orientation="vertical" decorative />
      <Button size="sm">Save</Button>
    </div>
  )
};
