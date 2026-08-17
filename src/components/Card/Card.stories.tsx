import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Status } from '../Status';
import { Typography } from '../Typography';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './Card';

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

export const Composed: Story = {
  render: () => (
    <div {...stylex.props(styles.example)}>
      <Card>
        <CardHeader>
          <CardTitle>Production deployment</CardTitle>
          <CardDescription>Deploy the current release candidate to production.</CardDescription>
          <CardAction>
            <Status variant="success">Ready</Status>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Typography>Version 1.0.0 passed every required release check.</Typography>
        </CardContent>
        <CardFooter>
          <Button type="button" variant="secondary">
            Review
          </Button>
          <Button type="button">Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  )
};
