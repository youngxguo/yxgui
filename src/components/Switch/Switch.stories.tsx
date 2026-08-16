import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    'aria-label': 'Email notifications'
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Flex align="center" gap="md">
      <Switch {...args} />
      <Typography>Email notifications</Typography>
    </Flex>
  )
};

export const Checked: Story = {
  args: {
    defaultChecked: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
