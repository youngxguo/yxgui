import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from './NumberField';

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  args: { defaultValue: 2, label: 'Seats', min: 0, max: 10 }
} satisfies Meta<typeof NumberField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Currency: Story = {
  args: {
    defaultValue: 125,
    format: { style: 'currency', currency: 'USD' },
    label: 'Budget',
    step: 5
  }
};
export const Disabled: Story = { args: { disabled: true } };
