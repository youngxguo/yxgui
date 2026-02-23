import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Write a short note...',
    size: 'md',
    disabled: false,
    invalid: false,
    rows: 4
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await userEvent.type(textarea, 'Short note for testing.');
    expect(textarea).toHaveValue('Short note for testing.');
  }
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Textarea>) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 360 }}>
      <Textarea {...args} size="sm" placeholder="Small textarea" />
      <Textarea {...args} size="md" placeholder="Medium textarea" />
      <Textarea {...args} size="lg" placeholder="Large textarea" />
    </div>
  )
};

export const States: Story = {
  render: (args: ComponentProps<typeof Textarea>) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 360 }}>
      <Textarea {...args} placeholder="Enabled" />
      <Textarea {...args} disabled placeholder="Disabled" defaultValue="This field is disabled" />
      <Textarea {...args} invalid placeholder="Invalid" defaultValue="Missing required details" />
    </div>
  )
};
