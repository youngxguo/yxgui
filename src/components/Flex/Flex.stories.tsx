import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card/Card';
import { Flex } from './Flex';

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  args: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'nowrap',
    gap: 'lg',
    inline: false
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse']
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'baseline']
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly']
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse']
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    padding: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    }
  }
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Flex {...args} data-testid="flex-default">
      <Button size="sm" variant="ghost">
        Back
      </Button>
      <Button size="sm">Save</Button>
      <Button size="sm" variant="secondary">
        Share
      </Button>
    </Flex>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const flex = canvas.getByTestId('flex-default');

    expect(flex).toHaveAttribute('data-direction', 'row');
    expect(canvas.getByRole('button', { name: 'Save' })).toBeVisible();
  }
};

export const VerticalCards: Story = {
  args: {
    direction: 'column',
    gap: 'xl',
    padding: 'md'
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Flex {...args}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage account details and identity information.</CardDescription>
          </CardHeader>
          <CardContent>Update your display name and avatar.</CardContent>
        </Card>
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Control email and push notification cadence.</CardDescription>
          </CardHeader>
          <CardContent>Mute noisy events and keep critical alerts.</CardContent>
        </Card>
      </Flex>
    </div>
  )
};

export const WrappedActions: Story = {
  args: {
    wrap: 'wrap',
    gap: 'sm'
  },
  render: (args) => (
    <div style={{ maxWidth: 280 }}>
      <Flex {...args}>
        <Button size="sm">New file</Button>
        <Button size="sm" variant="secondary">
          Export
        </Button>
        <Button size="sm" variant="ghost">
          Share link
        </Button>
        <Button size="sm" variant="secondary">
          Archive
        </Button>
        <Button size="sm" variant="ghost">
          Delete
        </Button>
      </Flex>
    </div>
  )
};
