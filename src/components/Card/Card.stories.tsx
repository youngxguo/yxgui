import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs']
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Starter Plan</CardTitle>
        <CardDescription>Good for small internal tools and experiments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'grid', gap: '0.35rem' }}>
          <Typography as="div">5 projects</Typography>
          <Typography as="div">Basic analytics</Typography>
          <Typography as="div">Email support</Typography>
        </div>
      </CardContent>
    </Card>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole('heading', { name: 'Starter Plan' })).toBeInTheDocument();
    expect(canvas.getByText('Basic analytics')).toBeInTheDocument();
  }
};

export const WithFooterActions: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Coffee Subscription</CardTitle>
        <CardDescription>Ship a rotating single-origin bag every two weeks.</CardDescription>
      </CardHeader>
      <CardContent>
        <Typography variant="muted">
          Manage roast level, grind size, and delivery cadence in one place.
        </Typography>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
};
