import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card';
import { Typography } from '../Typography';
import { Grid, GridItem } from './Grid';

const styles = stylex.create({ frame: { width: '448px' } });

const meta = {
  title: 'Components/Grid',
  component: Grid,
  render: (args) => (
    <div {...stylex.props(styles.frame)}>
      <Grid {...args}>
        {['Alpha', 'Beta', 'Gamma', 'Delta'].map((label) => (
          <Card key={label}>
            <Typography>{label}</Typography>
          </Card>
        ))}
      </Grid>
    </div>
  )
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { columns: 2, gap: 'md' } };
export const Responsive: Story = { args: { columns: 'auto-sm', gap: 'md' } };
export const Spanning: Story = {
  render: () => (
    <div {...stylex.props(styles.frame)}>
      <Grid columns={3} gap="md">
        <GridItem columnSpan={2}>
          <Card>
            <Typography>Two columns</Typography>
          </Card>
        </GridItem>
        <Card>
          <Typography>One</Typography>
        </Card>
        <GridItem columnSpan="full">
          <Card>
            <Typography>Full width</Typography>
          </Card>
        </GridItem>
      </Grid>
    </div>
  )
};
