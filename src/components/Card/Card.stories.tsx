import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
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
    <Flex align="start">
      <Card>
        <Typography>Card content</Typography>
      </Card>
    </Flex>
  )
};
