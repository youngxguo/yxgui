import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Status } from './Status';

describe('Status', () => {
  it('exposes its text through a polite status region', () => {
    render(<Status variant="success">Operational</Status>);
    expect(screen.getByRole('status')).toHaveTextContent('Operational');
    expect(screen.getByRole('status').querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('preserves native span attributes and role overrides', () => {
    render(
      <Status aria-label="Deployment state" data-state="queued" role="note">
        Queued
      </Status>
    );
    expect(screen.getByRole('note', { name: 'Deployment state' })).toHaveAttribute(
      'data-state',
      'queued'
    );
  });
});
