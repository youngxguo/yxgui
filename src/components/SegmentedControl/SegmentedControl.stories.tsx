import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

const options = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Timeline', value: 'timeline' }
] as const;

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    defaultValue: 'list',
    label: 'View',
    name: 'view',
    options
  }
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FullWidth: Story = { args: { fullWidth: true } };
export const Vertical: Story = { args: { orientation: 'vertical' } };
export const Invalid: Story = { args: { defaultValue: undefined, error: 'Choose a view.' } };
export const Disabled: Story = { args: { disabled: true } };
