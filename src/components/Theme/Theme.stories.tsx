import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../Typography';
import { Theme } from './Theme';

const meta = {
  title: 'Components/Theme',
  component: Theme,
  args: {
    children: <Typography>Theme content</Typography>
  }
} satisfies Meta<typeof Theme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
  args: {
    mode: 'dark'
  }
};
