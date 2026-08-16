import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './Combobox';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { disabled: true, label: 'Pear (unavailable)', value: 'pear' }
] as const;

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  args: {
    description: 'Type to filter the available fruit.',
    label: 'Favorite fruit',
    options,
    placeholder: 'Search fruit…'
  }
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true, defaultValue: 'blueberry' }
};
