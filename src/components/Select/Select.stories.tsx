import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Select } from './Select';

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    size: 'md',
    disabled: false,
    invalid: false,
    'aria-label': 'Team size'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: ComponentProps<typeof Select>) => (
    <Select {...args} defaultValue="small">
      <option value="small">1-10 people</option>
      <option value="mid">11-50 people</option>
      <option value="large">50+ people</option>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox', { name: 'Team size' });

    expect(select).toHaveValue('small');
    await userEvent.selectOptions(select, 'mid');
    expect(select).toHaveValue('mid');
  }
};

export const Sizes: Story = {
  render: (args: ComponentProps<typeof Select>) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
      <Select {...args} size="sm" defaultValue="a" aria-label="Small select">
        <option value="a">Small</option>
      </Select>
      <Select {...args} size="md" defaultValue="b" aria-label="Medium select">
        <option value="b">Medium</option>
      </Select>
      <Select {...args} size="lg" defaultValue="c" aria-label="Large select">
        <option value="c">Large</option>
      </Select>
    </div>
  )
};

export const States: Story = {
  render: (args: ComponentProps<typeof Select>) => (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 320 }}>
      <Select {...args} defaultValue="active" aria-label="Enabled select">
        <option value="active">Enabled</option>
      </Select>
      <Select {...args} disabled defaultValue="disabled" aria-label="Disabled select">
        <option value="disabled">Disabled</option>
      </Select>
      <Select {...args} invalid defaultValue="invalid" aria-label="Invalid select">
        <option value="invalid">Invalid</option>
      </Select>
    </div>
  )
};
