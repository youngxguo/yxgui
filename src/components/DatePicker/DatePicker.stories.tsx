import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: {
    defaultValue: '2026-08-16',
    description: 'Choose the date when this release becomes available.',
    label: 'Release date',
    name: 'releaseDate'
  }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <div style={{ minHeight: 420 }}>
      <DatePicker {...args} />
    </div>
  )
};
export const Empty: Story = { args: { defaultValue: undefined } };
export const Bounded: Story = { args: { max: '2026-08-24', min: '2026-08-10' } };
export const Invalid: Story = { args: { error: 'Choose an available release date.' } };
export const Disabled: Story = { args: { disabled: true } };
