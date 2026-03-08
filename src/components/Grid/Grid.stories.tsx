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
    alignContent: 'stretch',
    justifyContent: 'stretch',
    autoFlow: 'row',
    gap: 'lg',
    inline: false
  },
  argTypes: {
    columns: {
      control: 'number',
      description:
        'Number (maps to repeat(n, minmax(0, 1fr))) or raw CSS grid-template-columns string.'
    },
    rows: {
      control: 'text',
      description:
        'Number (maps to repeat(n, minmax(0, 1fr))) or raw CSS grid-template-rows string.'
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch']
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch']
    },
    alignContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly']
    },
    justifyContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly']
    },
    autoFlow: {
      control: 'select',
      options: ['row', 'column', 'row-dense', 'column-dense']
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
    padding: {
      control: 'select',
      options: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl']
    },
    autoRows: {
      control: 'text'
    },
    autoColumns: {
      control: 'text'
    },
    areas: {
      control: 'text'
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

    expect(grid).toHaveAttribute('data-auto-flow', 'row');
    expect(canvas.getByRole('button', { name: 'Profile' })).toBeVisible();
  }
};

export const DashboardPanels: Story = {
  args: {
    columns: 'repeat(auto-fit, minmax(13rem, 1fr))',
    gap: 'md',
    rowGap: 'lg',
    padding: 'sm',
    align: 'stretch'
  },
  render: (args) => (
    <Grid {...args} style={{ maxWidth: 880 }}>
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
  )
};

export const TemplateAreas: Story = {
  args: {
    columns: '2fr 1fr',
    rows: 'auto auto',
    areas: '"hero sidebar" "table sidebar"',
    gap: 'sm'
  },
  render: (args) => (
    <Grid {...args} style={{ maxWidth: 760 }}>
      <section style={{ ...panelStyle, gridArea: 'hero' }}>
        <Typography variant="small">Release Health</Typography>
        <Typography variant="muted">No production incidents in the last 14 days.</Typography>
      </section>
      <section style={{ ...panelStyle, gridArea: 'table' }}>
        <Typography variant="small">Open Work</Typography>
        <Typography variant="muted">17 tasks pending review in this sprint.</Typography>
      </section>
      <aside style={{ ...panelStyle, gridArea: 'sidebar' }}>
        <Typography variant="small">Owners</Typography>
        <Typography variant="muted">Design, Platform, and QA rotations assigned.</Typography>
      </aside>
    </Grid>
  )
};
