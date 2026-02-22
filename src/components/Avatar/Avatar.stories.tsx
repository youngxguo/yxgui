import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { expect, within } from 'storybook/test';
import { Avatar } from './Avatar';

const avatarImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%23dcdad0%22/%3E%3Ccircle cx=%2260%22 cy=%2248%22 r=%2220%22 fill=%22%2389887a%22/%3E%3Cpath d=%22M24 104c7-20 22-30 36-30s29 10 36 30%22 fill=%22none%22 stroke=%22%2389887a%22 stroke-width=%2212%22 stroke-linecap=%22round%22/%3E%3C/svg%3E';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    alt: 'Young Guo',
    children: 'YG',
    shape: 'circle',
    size: 'md',
    src: avatarImage
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square']
    }
  }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole('img', { name: 'Young Guo' })).toBeInTheDocument();
  }
};

export const Fallback: Story = {
  args: {
    src: undefined
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('YG')).toBeInTheDocument();
  }
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Avatar>) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '0.75rem' }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  )
};

export const Shapes: Story = {
  render: (args: ComponentProps<typeof Avatar>) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '0.75rem' }}>
      <Avatar {...args} shape="circle" />
      <Avatar {...args} shape="rounded" />
      <Avatar {...args} shape="square" />
    </div>
  )
};
