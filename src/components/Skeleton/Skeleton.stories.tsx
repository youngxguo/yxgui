import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Content: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <Flex align="center" gap="md">
        <Skeleton variant="avatar" />
        <Flex direction="column" gap="sm">
          <Skeleton width="md" />
          <Skeleton width="sm" />
        </Flex>
      </Flex>
      <Skeleton size="lg" variant="block" />
    </Flex>
  )
};
