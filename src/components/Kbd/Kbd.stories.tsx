import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../Typography';
import { Kbd } from './Kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  args: { children: '⌘K' }
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Combination: Story = {
  render: () => (
    <Typography>
      Press <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>
    </Typography>
  )
};
