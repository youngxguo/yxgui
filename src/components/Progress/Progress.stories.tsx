import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Progress } from './Progress';

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
