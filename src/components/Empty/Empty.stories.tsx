import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from './Empty';

const meta = {
  title: 'Feedback/Empty',
  component: Empty,
  tags: ['autodocs']
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export const Default: Story = {
  render: () => (
    <Empty style={{ maxWidth: 520 }}>
      <EmptyMedia>
        <SearchIcon />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No matching orders</EmptyTitle>
        <EmptyDescription>
          Try changing filters, broadening the date range, or clearing the search term.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button variant="ghost">Clear filters</Button>
        <Button>New order</Button>
      </EmptyActions>
    </Empty>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole('heading', { name: 'No matching orders' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument();
  }
};

export const LoadingPlaceholder: Story = {
  render: () => (
    <Empty style={{ maxWidth: 520 }}>
      <EmptyMedia>
        <Spinner size="lg" label="Syncing orders" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>Fetching orders</EmptyTitle>
        <EmptyDescription>
          We are syncing the latest records from your connected storefronts.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
};
