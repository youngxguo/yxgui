import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { CircularProgress, Progress } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    'aria-label': 'Upload progress',
    value: 62
  }
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      <Progress aria-label="Small progress" size="sm" value={25} />
      <Progress aria-label="Medium progress" value={50} />
      <Progress aria-label="Large progress" size="lg" value={75} />
    </Flex>
  )
};

export const Indeterminate: Story = {
  args: {
    value: undefined
  }
};

export const Circular: Story = {
  render: () => (
    <Flex align="center" gap="lg">
      <CircularProgress aria-label="Small upload" size="sm" value={25} />
      <CircularProgress aria-label="Medium upload" value={62} />
      <CircularProgress aria-label="Large upload" showValue size="lg" value={84} />
    </Flex>
  )
};

export const CircularIndeterminate: Story = {
  render: () => <CircularProgress aria-label="Loading release" size="lg" />
};
