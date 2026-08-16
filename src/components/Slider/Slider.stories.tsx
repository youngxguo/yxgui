import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  args: { defaultValue: 40, label: 'Volume' }
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Range: Story = {
  args: {
    defaultValue: [20, 75],
    label: 'Price range',
    thumbLabels: ['Minimum price', 'Maximum price']
  }
};
export const Disabled: Story = { args: { disabled: true } };
export const Vertical: Story = { args: { defaultValue: 65, orientation: 'vertical' } };
