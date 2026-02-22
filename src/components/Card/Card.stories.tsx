import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { cssVarRefs } from '../../theme/vars.stylex';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta = {
  title: 'Components/Card',
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
          <div>5 projects</div>
          <div>Basic analytics</div>
          <div>Email support</div>
        </div>
      </CardContent>
    </Card>
  )
};

export const WithFooterActions: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Coffee Subscription</CardTitle>
        <CardDescription>Ship a rotating single-origin bag every two weeks.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ color: cssVarRefs.palette.mutedForeground }}>
          Manage roast level, grind size, and delivery cadence in one place.
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
};
