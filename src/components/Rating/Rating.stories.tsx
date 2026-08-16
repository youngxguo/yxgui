import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from './Rating';

const meta = {
  title: 'Components/Rating',
  component: Rating,
  args: { defaultValue: 3, label: 'Product rating', name: 'product-rating' }
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { defaultValue: 0 } };
export const Disabled: Story = { args: { disabled: true } };
