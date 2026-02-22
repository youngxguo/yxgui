import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Press me',
    variant: 'primary',
    size: 'md',
    disabled: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args: ComponentProps<typeof Button>) => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  )
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Button>) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '0.75rem' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
