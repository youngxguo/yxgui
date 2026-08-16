import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete } from './Autocomplete';

const options = [
  { label: 'Accordion', value: 'accordion' },
  { label: 'Alert dialog', value: 'alert-dialog' },
  { label: 'Autocomplete', value: 'autocomplete' },
  { label: 'Avatar', value: 'avatar' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Combobox', value: 'combobox' },
  { disabled: true, label: 'Data grid (planned)', value: 'data-grid' }
] as const;

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  args: {
    description: 'Enter any value or choose a matching suggestion.',
    label: 'Component search',
    options,
    placeholder: 'Search components…'
  }
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true, defaultValue: 'a' }
};
