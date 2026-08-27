import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../Typography';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Typography>Card content</Typography>
    </Card>
  )
};
