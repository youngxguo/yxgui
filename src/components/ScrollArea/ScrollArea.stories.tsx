import * as stylex from '@stylexjs/stylex';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from './ScrollArea';

const styles = stylex.create({
  frame: { maxWidth: '420px' },
  list: { fontFamily: 'Inter Variable, sans-serif', margin: 0, paddingLeft: '20px' },
  item: { paddingBlock: '8px' },
  columns: { display: 'flex', gap: '16px' },
  card: {
    backgroundColor: '#dbeafe',
    borderRadius: '6px',
    color: '#172033',
    flexShrink: 0,
    fontFamily: 'Inter Variable, sans-serif',
    padding: '16px',
    width: '160px'
  }
});

const items = Array.from({ length: 12 }, (_, index) => `Activity ${index + 1}`);

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  decorators: [
    (Story) => (
      <div {...stylex.props(styles.frame)}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: { children: null },
  render: () => (
    <ScrollArea aria-label="Recent activity" size="sm">
      <ol {...stylex.props(styles.list)}>
        {items.map((item) => (
          <li key={item} {...stylex.props(styles.item)}>
            {item}
          </li>
        ))}
      </ol>
    </ScrollArea>
  )
};

export const BothDirections: Story = {
  args: { children: null },
  render: () => (
    <ScrollArea aria-label="Project columns" orientation="both" size="sm">
      <div {...stylex.props(styles.columns)}>
        {['Backlog', 'In progress', 'Review', 'Complete'].map((column) => (
          <div key={column} {...stylex.props(styles.card)}>
            {column}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
};
