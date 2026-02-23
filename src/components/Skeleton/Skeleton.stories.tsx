import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    variant: 'text',
    animated: true,
    width: '100%'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rect', 'circle']
    }
  }
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Skeleton {...args} style={{ maxWidth: 240 }} />
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 280 }}>
      <Skeleton variant="text" width="85%" />
      <Skeleton variant="text" width="55%" />
      <Skeleton variant="rect" width={280} height={96} />
      <Skeleton variant="circle" />
      <Skeleton variant="rect" width={280} height={40} animated={false} />
    </div>
  )
};
