import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from './Empty';

describe('Empty', () => {
  it('renders composed slots with accessible heading content', () => {
    render(
      <Empty>
        <EmptyMedia aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" />
          </svg>
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No invoices yet</EmptyTitle>
          <EmptyDescription>Create your first invoice to start tracking payments.</EmptyDescription>
        </EmptyHeader>
        <EmptyActions>
          <button type="button">Create invoice</button>
        </EmptyActions>
      </Empty>
    );

    expect(screen.getByRole('heading', { name: 'No invoices yet' })).toBeInTheDocument();
    expect(
      screen.getByText('Create your first invoice to start tracking payments.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create invoice' })).toBeInTheDocument();
  });

  it('forwards native props to the root container', () => {
    render(<Empty data-testid="empty" title="State" />);

    expect(screen.getByTestId('empty')).toHaveAttribute('title', 'State');
  });

  it('accepts ref props for root and title slots', () => {
    const rootRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLHeadingElement>();

    render(
      <Empty ref={rootRef}>
        <EmptyHeader>
          <EmptyTitle ref={titleRef}>No data</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
  });
});
