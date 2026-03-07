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
    size: 'md',
    fullWidth: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'error', 'outline']
    },
    size: {
      control: 'select',
      options: ['sm', 'md']
    },
    fullWidth: {
      control: 'boolean'
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
  render: ({ size = 'md' }: ComponentProps<typeof Badge>) => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Badge size={size} variant="neutral">
        Default
      </Badge>
      <Badge size={size} variant="success">
        Success
      </Badge>
      <Badge size={size} variant="warning">
        Warning
      </Badge>
      <Badge size={size} variant="error">
        Destructive
      </Badge>
      <Badge size={size} variant="outline">
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

export const InColumnFlex: Story = {
  render: (args: ComponentProps<typeof Badge>) => (
    <div
      style={{
        border: '1px dashed #d4d4d8',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '0.75rem',
        width: '20rem'
      }}
    >
      <Badge {...args}>Intrinsic width (default)</Badge>
      <Badge {...args} fullWidth>
        Full width (opt-in)
      </Badge>
    </div>
  )
};
