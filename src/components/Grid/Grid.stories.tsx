import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { Grid } from './Grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  args: {
    columns: 3,
    align: 'stretch',
    justify: 'stretch',
    gap: 'lg',
    inline: false
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12]
    },
    rows: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6]
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch']
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch']
    },
    gap: {
      control: 'select',
      options: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl']
    },
    padding: {
      control: 'select',
      options: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl']
    }
  }
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const panelStyle = {
  border: '1px solid #d1d5db',
  borderRadius: 8,
  padding: '0.625rem'
};

export const Default: Story = {
  render: (args) => (
    <Grid {...args} data-testid="grid-default">
      <Button size="sm">Profile</Button>
      <Button size="sm" variant="secondary">
        Billing
      </Button>
      <Button size="sm" variant="ghost">
        Security
      </Button>
      <Button size="sm" variant="secondary">
        Notifications
      </Button>
      <Button size="sm">Integrations</Button>
      <Button size="sm" variant="ghost">
        API keys
      </Button>
    </Grid>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByTestId('grid-default');

    expect(grid).toHaveAttribute('data-align', 'stretch');
    expect(canvas.getByRole('button', { name: 'Profile' })).toBeVisible();
  }
};

export const DashboardPanels: Story = {
  args: {
    columns: 2,
    gap: 'md',
    padding: 'sm',
    align: 'stretch'
  },
  render: (args) => (
    <div style={{ maxWidth: 880 }}>
      <Grid {...args}>
        <section style={panelStyle}>
          <Typography variant="small">Revenue</Typography>
          <Typography variant="muted">$24,981 this month</Typography>
        </section>
        <section style={panelStyle}>
          <Typography variant="small">Activation</Typography>
          <Typography variant="muted">63% users completed onboarding</Typography>
        </section>
        <section style={panelStyle}>
          <Typography variant="small">Reliability</Typography>
          <Typography variant="muted">99.98% service uptime in the last 30 days</Typography>
        </section>
        <section style={panelStyle}>
          <Typography variant="small">Support</Typography>
          <Typography variant="muted">Median first response: 17 minutes</Typography>
        </section>
      </Grid>
    </div>
  )
};

export const Matrix: Story = {
  args: {
    columns: 3,
    rows: 2,
    gap: 'sm'
  },
  render: (args) => (
    <Grid {...args}>
      <section style={panelStyle}>
        <Typography variant="small">A1</Typography>
      </section>
      <section style={panelStyle}>
        <Typography variant="small">A2</Typography>
      </section>
      <section style={panelStyle}>
        <Typography variant="small">A3</Typography>
      </section>
      <section style={panelStyle}>
        <Typography variant="small">B1</Typography>
      </section>
      <section style={panelStyle}>
        <Typography variant="small">B2</Typography>
      </section>
      <section style={panelStyle}>
        <Typography variant="small">B3</Typography>
      </section>
    </Grid>
  )
};
