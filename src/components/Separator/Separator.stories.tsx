import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { Separator } from './Separator';

const styles = stylex.create({
  verticalFrame: {
    height: '48px'
  }
});

const meta = {
  title: 'Components/Separator',
  component: Separator
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <Typography>Above</Typography>
      <Separator />
      <Typography>Below</Typography>
    </Flex>
  )
};

export const Vertical: Story = {
  render: () => (
    <div {...stylex.props(styles.verticalFrame)}>
      <Flex align="center" gap="md">
        <Typography>Left</Typography>
        <Separator orientation="vertical" />
        <Typography>Right</Typography>
      </Flex>
    </div>
  )
};
