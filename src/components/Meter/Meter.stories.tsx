import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from './Meter';

const meta = {
  title: 'Components/Meter',
  component: Meter,
  args: { 'aria-label': 'Storage used', max: 100, value: 64, fullWidth: true }
} satisfies Meta<typeof Meter>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Optimum: Story = { args: { low: 30, high: 70, optimum: 20, value: 18 } };
