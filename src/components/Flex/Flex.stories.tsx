import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card/Card';
import { Typography } from '../Typography/Typography';
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
    alignContent: 'stretch',
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
    alignContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly']
    },
    gap: {
      control: 'select',
      options: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl']
    },
    rowGap: {
      control: 'select',
      options: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl']
    },
    columnGap: {
      control: 'select',
      options: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl']
    },
    basis: {
      control: 'text',
      description: 'Spacing token or CSS flex-basis value (for example: "md", "33%", "16rem").'
    },
    grow: {
      control: 'number'
    },
    shrink: {
      control: 'number'
    },
    flex: {
      control: 'text',
      description: 'Optional CSS flex shorthand. When set, it overrides basis/grow/shrink.'
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
    gap: 'xl'
  },
  render: (args) => (
    <Flex {...args} style={{ maxWidth: 360 }}>
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
  )
};

export const WrappedActions: Story = {
  args: {
    wrap: 'wrap',
    gap: 'sm',
    rowGap: 'md',
    columnGap: 'sm'
  },
  render: (args) => (
    <Flex {...args} style={{ maxWidth: 280 }}>
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
  )
};

export const BasisSizing: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ maxWidth: 680 }}>
      <Typography variant="small">
        Use basis/grow/shrink for explicit control, or flex shorthand for app-specific sizing.
      </Typography>
      <Flex gap="sm">
        <Flex
          basis="xl"
          grow={1}
          style={{ border: '1px solid #d1d5db', borderRadius: 6, padding: '0.5rem' }}
        >
          <Typography variant="small">basis=&quot;xl&quot; grow={'{1}'}</Typography>
        </Flex>
        <Flex
          basis="35%"
          shrink={0}
          style={{ border: '1px solid #d1d5db', borderRadius: 6, padding: '0.5rem' }}
        >
          <Typography variant="small">basis=&quot;35%&quot; shrink={'{0}'}</Typography>
        </Flex>
        <Flex
          flex="0 0 220px"
          style={{ border: '1px solid #d1d5db', borderRadius: 6, padding: '0.5rem' }}
        >
          <Typography variant="small">flex=&quot;0 0 220px&quot;</Typography>
        </Flex>
      </Flex>
    </Flex>
  )
};

export const WrappedColumns: Story = {
  render: () => (
    <Flex
      wrap="wrap"
      alignContent="start"
      gap="sm"
      rowGap="md"
      style={{ maxWidth: 620, minHeight: 220 }}
    >
      {['Overview', 'Roadmap', 'Quality', 'Notes', 'Releases', 'Owners'].map((label) => (
        <Flex
          key={label}
          flex="1 1 180px"
          direction="column"
          gap="xs"
          style={{ border: '1px solid #d1d5db', borderRadius: 6, padding: '0.5rem' }}
        >
          <Typography variant="small">{label}</Typography>
          <Typography variant="muted">Flexible card columns with controlled wrapping.</Typography>
        </Flex>
      ))}
    </Flex>
  )
};
