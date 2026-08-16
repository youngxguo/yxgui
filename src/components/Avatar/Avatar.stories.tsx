import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    alt: 'Young Guo'
  }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {};

export const Sizes: Story = {
  render: () => (
    <Flex align="center" gap="md">
      <Avatar alt="Small avatar" fallback="S" size="sm" />
      <Avatar alt="Medium avatar" fallback="M" />
      <Avatar alt="Large avatar" fallback="L" size="lg" />
      <Avatar alt="Rounded avatar" fallback="YG" shape="rounded" size="lg" />
    </Flex>
  )
};
