import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagInput } from './TagInput';

const meta = {
  title: 'Components/TagInput',
  component: TagInput,
  args: {
    defaultValue: ['accessible', 'typed'],
    description: 'Press Enter or comma to add a tag.',
    label: 'Tags',
    name: 'tags'
  }
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { defaultValue: [] } };
export const ReadOnly: Story = { args: { readOnly: true } };
