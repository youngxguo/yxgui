import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button'
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Flex gap="md" wrap>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </Flex>
  )
};

export const Sizes: Story = {
  render: () => (
    <Flex align="center" gap="md">
      <Button size="sm">Small</Button>
      <Button>Medium</Button>
    </Flex>
  )
};

export const FullWidth: Story = {
  args: { fullWidth: true }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
