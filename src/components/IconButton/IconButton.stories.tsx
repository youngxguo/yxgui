import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { MailIcon, MoonIcon, SunIcon } from '../Icon';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    children: <MailIcon />,
    label: 'Send message'
  }
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Flex gap="md">
      <IconButton label="Send message">
        <MailIcon />
      </IconButton>
      <IconButton label="Light theme" variant="secondary">
        <SunIcon />
      </IconButton>
      <IconButton label="Dark theme" variant="ghost">
        <MoonIcon />
      </IconButton>
      <IconButton label="Delete message" variant="danger">
        ×
      </IconButton>
    </Flex>
  )
};

export const Sizes: Story = {
  render: () => (
    <Flex align="center" gap="md">
      <IconButton label="Small send button" size="sm" variant="secondary">
        <MailIcon />
      </IconButton>
      <IconButton label="Medium send button" variant="secondary">
        <MailIcon />
      </IconButton>
    </Flex>
  )
};

export const Disabled: Story = {
  args: { disabled: true }
};
