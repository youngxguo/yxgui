import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  args: { defaultValue: '2026-08-16', label: 'Release date' }
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Bounded: Story = { args: { max: '2026-08-24', min: '2026-08-10' } };
export const MondayFirst: Story = { args: { weekStartsOn: 1 } };
export const Disabled: Story = { args: { disabled: true } };
