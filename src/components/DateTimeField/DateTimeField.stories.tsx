import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateField, DateTimeField, TimeField } from './DateTimeField';

const meta = {
  title: 'Components/DateTimeField',
  component: DateField,
  args: {
    description: 'Uses the date and timezone conventions of your device.',
    label: 'Start date'
  }
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Date: Story = { args: { defaultValue: '2026-08-16' } };

export const Time: Story = {
  render: () => (
    <TimeField
      defaultValue="09:30"
      description="Choose a time in your current timezone."
      label="Start time"
      step={300}
    />
  )
};

export const DateAndTime: Story = {
  render: () => (
    <DateTimeField
      defaultValue="2026-08-16T09:30"
      description="The browser provides the local date and time picker."
      label="Publish at"
    />
  )
};

export const Invalid: Story = {
  args: { defaultValue: '2026-08-16', error: 'Choose a date after August 20.' }
};
