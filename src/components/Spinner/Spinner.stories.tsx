import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: {
    label: 'Loading'
  }
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Flex align="center" gap="lg">
      <Spinner label="Loading small item" size="sm" />
      <Spinner label="Loading medium item" />
      <Spinner label="Loading large item" size="lg" />
    </Flex>
  )
};
