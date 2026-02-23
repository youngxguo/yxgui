import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from '../Input/Input';
import { Label } from './Label';

const meta = {
  title: 'Forms/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Email address',
    size: 'md',
    required: false,
    htmlFor: 'label-example-input'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md']
    }
  }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: ComponentProps<typeof Label>) => (
    <div style={{ display: 'grid', gap: '0.5rem', maxWidth: 320 }}>
      <Label {...args} />
      <Input id="label-example-input" placeholder="you@example.com" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Email address');
    const input = canvas.getByRole('textbox');

    await userEvent.click(label);
    expect(input).toHaveFocus();
  }
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Label>) => (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <Label {...args} size="sm" htmlFor="label-size-sm">
        Small label
      </Label>
      <Input id="label-size-sm" placeholder="Small label input" />
      <Label {...args} size="md" htmlFor="label-size-md">
        Medium label
      </Label>
      <Input id="label-size-md" placeholder="Medium label input" />
    </div>
  )
};

export const Required: Story = {
  args: {
    required: true
  },
  render: (args: ComponentProps<typeof Label>) => (
    <div style={{ display: 'grid', gap: '0.5rem', maxWidth: 320 }}>
      <Label {...args}>Workspace name</Label>
      <Input id="label-example-input" placeholder="Acme" />
    </div>
  )
};
