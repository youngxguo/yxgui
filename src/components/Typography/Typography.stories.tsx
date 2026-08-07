import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  args: {
    children: 'Typography'
  }
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Heading1: Story = {
  args: {
    children: 'Heading 1',
    variant: 'h1'
  }
};

export const Heading2: Story = {
  args: {
    children: 'Heading 2',
    variant: 'h2'
  }
};
