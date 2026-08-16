import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline, type TimelineItem } from './Timeline';

const items: TimelineItem[] = [
  {
    dateTime: '2026-08-16T09:00:00-07:00',
    description: 'All checks passed on the release branch.',
    id: 'build',
    status: 'complete',
    time: '9:00 AM',
    title: 'Build completed'
  },
  {
    dateTime: '2026-08-16T09:04:00-07:00',
    description: 'Uploading the package and release notes.',
    id: 'publish',
    status: 'current',
    time: '9:04 AM',
    title: 'Publishing release'
  },
  {
    description: 'The release will be announced when publishing finishes.',
    id: 'announce',
    title: 'Notify subscribers'
  }
];

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  args: { items, label: 'Release activity' }
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = {
  args: {
    items: [
      items[0],
      {
        dateTime: '2026-08-16T09:04:00-07:00',
        description: 'The registry rejected the package credentials.',
        id: 'publish-error',
        status: 'error',
        time: '9:04 AM',
        title: 'Publishing failed'
      }
    ]
  }
};
