import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat, StatDescription, StatLabel, StatTrend, StatValue } from './Stat';

const meta = { title: 'Components/Stat', component: Stat } satisfies Meta<typeof Stat>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  render: () => (
    <Stat>
      <StatLabel>Monthly revenue</StatLabel>
      <StatValue>$24,800</StatValue>
      <StatDescription>
        <StatTrend direction="up">↑ 12%</StatTrend> from last month
      </StatDescription>
    </Stat>
  )
};

export const Negative: Story = {
  render: () => (
    <Stat>
      <StatLabel>Response time</StatLabel>
      <StatValue>428 ms</StatValue>
      <StatDescription>
        <StatTrend direction="down">↓ 8%</StatTrend> from last week
      </StatDescription>
    </Stat>
  )
};
