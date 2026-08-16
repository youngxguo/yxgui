import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  args: {
    description: 'Search across component names and descriptions.',
    label: 'Search components',
    placeholder: 'Try “dialog”'
  }
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'dialog' } };
export const Invalid: Story = { args: { error: 'Search is temporarily unavailable.' } };
