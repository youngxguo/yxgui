import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorField } from './ColorField';

const meta = {
  title: 'Components/ColorField',
  component: ColorField,
  args: {
    defaultValue: '#2563eb',
    description: 'Enter a six-digit hexadecimal color.',
    label: 'Brand color'
  }
} satisfies Meta<typeof ColorField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Invalid: Story = { args: { error: 'Choose a color with enough contrast.' } };
export const Disabled: Story = { args: { disabled: true } };
