import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Email address',
    size: 'md',
    disabled: false,
    invalid: false
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await userEvent.type(input, 'person@example.com');
    expect(input).toHaveValue('person@example.com');
  }
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Input>) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
      <Input {...args} size="sm" placeholder="Small input" />
      <Input {...args} size="md" placeholder="Medium input" />
      <Input {...args} size="lg" placeholder="Large input" />
    </div>
  )
};

export const States: Story = {
  render: (args: ComponentProps<typeof Input>) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
      <Input {...args} placeholder="Enabled" />
      <Input {...args} disabled placeholder="Disabled" />
      <Input {...args} invalid placeholder="Invalid" defaultValue="bad@" />
    </div>
  )
};
