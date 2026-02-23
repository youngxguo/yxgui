import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Label } from '../Label/Label';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    size: 'md',
    disabled: false,
    invalid: false,
    defaultChecked: false,
    'aria-label': 'Receive release updates'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md']
    }
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Receive release updates' });

    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  }
};

export const WithLabel: Story = {
  render: (args: ComponentProps<typeof Checkbox>) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
      <Checkbox {...args} id="checkbox-story" aria-label={undefined} />
      <Label htmlFor="checkbox-story">Receive release updates</Label>
    </div>
  )
};

export const States: Story = {
  render: (args: ComponentProps<typeof Checkbox>) => (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
        <Checkbox {...args} id="checkbox-enabled" aria-label={undefined} />
        <Label htmlFor="checkbox-enabled">Enabled</Label>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
        <Checkbox {...args} id="checkbox-checked" defaultChecked aria-label={undefined} />
        <Label htmlFor="checkbox-checked">Checked</Label>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
        <Checkbox {...args} id="checkbox-disabled" disabled aria-label={undefined} />
        <Label htmlFor="checkbox-disabled">Disabled</Label>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
        <Checkbox {...args} id="checkbox-invalid" invalid aria-label={undefined} />
        <Label htmlFor="checkbox-invalid">Invalid</Label>
      </div>
    </div>
  )
};
