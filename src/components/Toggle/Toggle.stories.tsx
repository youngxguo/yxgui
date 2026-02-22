import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    children: 'Bold',
    variant: 'secondary',
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
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPressedChange: fn()
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Bold' });

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(args.onPressedChange).toHaveBeenCalledWith(true);
  }
};

export const Variants: Story = {
  render: (args: ComponentProps<typeof Toggle>) => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Toggle {...args} variant="primary">
        Primary
      </Toggle>
      <Toggle {...args} variant="secondary" defaultPressed>
        Secondary
      </Toggle>
      <Toggle {...args} variant="ghost">
        Ghost
      </Toggle>
    </div>
  )
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Toggle>) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '0.75rem' }}>
      <Toggle {...args} size="sm">
        Small
      </Toggle>
      <Toggle {...args} size="md">
        Medium
      </Toggle>
      <Toggle {...args} size="lg">
        Large
      </Toggle>
    </div>
  )
};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    children: 'Pinned'
  }
};
