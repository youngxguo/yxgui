import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Icon } from './Icon';

const meta = {
  title: 'Components/Icons'
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brands: Story = {
  render: () => (
    <Flex gap="lg" align="center" wrap>
      <Flex padding="lg" align="center" justify="center">
        <Icon name="github" />
      </Flex>
      <Flex padding="lg" align="center" justify="center">
        <Icon name="linkedin" />
      </Flex>
    </Flex>
  )
};

export const Interface: Story = {
  render: () => (
    <Flex gap="lg" align="center" wrap>
      <Flex padding="lg" align="center" justify="center">
        <Icon name="mail" />
      </Flex>
      <Flex padding="lg" align="center" justify="center">
        <Icon name="sun" />
      </Flex>
      <Flex padding="lg" align="center" justify="center">
        <Icon name="moon" />
      </Flex>
    </Flex>
  )
};
