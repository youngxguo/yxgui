import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
    variant: 'primary',
    size: 'md'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline']
    },
    size: {
      control: 'select',
      options: ['sm', 'md']
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args: ComponentProps<typeof Badge>) => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Badge {...args} variant="primary">
        Primary
      </Badge>
      <Badge {...args} variant="secondary">
        Secondary
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
