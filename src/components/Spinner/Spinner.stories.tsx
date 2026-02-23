import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Typography } from '../Typography/Typography';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: {
    size: 'md',
    animated: true,
    label: 'Loading'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Spinner {...args} />,
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
        <Spinner size="sm" label="Loading small example" />
        <Typography as="span" variant="muted">
          Small
        </Typography>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
        <Spinner size="md" label="Loading medium example" />
        <Typography as="span" variant="muted">
          Medium
        </Typography>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
        <Spinner size="lg" label="Loading large example" />
        <Typography as="span" variant="muted">
          Large
        </Typography>
      </div>
    </div>
  )
};

export const Static: Story = {
  args: {
    animated: false,
    label: 'Idle loading indicator'
  }
};
