import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Timeline } from './Timeline';

describe('Timeline', () => {
  it('renders ordered events with native time semantics', () => {
    render(
      <Timeline
        items={[
          {
            dateTime: '2026-08-16T09:00:00-07:00',
            id: 'build',
            status: 'complete',
            time: '9:00 AM',
            title: 'Build completed'
          },
          { id: 'deploy', status: 'current', title: 'Deploying' }
        ]}
        label="Deployment history"
      />
    );

    expect(screen.getByRole('list', { name: 'Deployment history' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('9:00 AM')).toHaveAttribute('datetime', '2026-08-16T09:00:00-07:00');
    expect(screen.getByText('Deploying').closest('li')).toHaveAttribute('aria-current', 'true');
  });

  it('gives visual statuses accessible text equivalents', () => {
    render(<Timeline items={[{ id: 'failure', status: 'error', title: 'Deployment failed' }]} />);
    expect(screen.getByRole('listitem')).toHaveTextContent('Error: Deployment failed');
  });
});
