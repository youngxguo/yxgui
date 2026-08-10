import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../Typography';
import { Card } from './Card';

const styles = stylex.create({
  example: {
    width: '360px'
  }
});

const meta = {
  title: 'Components/Card',
  component: Card
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div {...stylex.props(styles.example)}>
      <Card>
        <Typography>Card content</Typography>
      </Card>
    </div>
  )
};
