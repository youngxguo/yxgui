import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
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
  render: (args) => <Skeleton {...args} data-testid="skeleton-default" style={{ maxWidth: 240 }} />,
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeleton = canvas.getByTestId('skeleton-default');

    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveAttribute('data-animated', 'true');
  }
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
