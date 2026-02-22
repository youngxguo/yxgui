import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 45,
    max: 100,
    size: 'md',
    'aria-label': 'Progress'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
      <Progress aria-label="Small" size="sm" value={30} />
      <Progress aria-label="Medium" size="md" value={55} />
      <Progress aria-label="Large" size="lg" value={80} />
    </div>
  )
};
