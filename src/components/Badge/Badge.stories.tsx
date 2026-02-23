import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { expect, within } from 'storybook/test';
import { Badge } from './Badge';

const meta = {
  title: 'Content/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
    variant: 'neutral',
    size: 'md'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'error', 'outline']
    },
    size: {
      control: 'select',
      options: ['sm', 'md']
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Badge')).toBeInTheDocument();
  }
};

export const Variants: Story = {
  render: (args: ComponentProps<typeof Badge>) => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Badge {...args} variant="neutral">
        Neutral
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="warning">
        Warning
      </Badge>
      <Badge {...args} variant="error">
        Error
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
    </div>
  )
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Badge>) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '0.75rem' }}>
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
    </div>
  )
};
