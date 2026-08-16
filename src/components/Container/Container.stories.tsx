import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card';
import { Typography } from '../Typography';
import { Container } from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  args: { size: 'md' },
  render: (args) => (
    <Container {...args}>
      <Card>
        <Typography variant="h2">Centered application content</Typography>
      </Card>
    </Container>
  )
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Narrow: Story = { args: { as: 'main', size: 'sm' } };
