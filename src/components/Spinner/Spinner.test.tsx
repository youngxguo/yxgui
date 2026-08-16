import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('is decorative by default and announced when labeled', () => {
    const { rerender } = render(<Spinner data-testid="spinner" />);
    expect(screen.getByTestId('spinner')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    rerender(<Spinner label="Loading invoices" />);
    expect(screen.getByRole('status', { name: 'Loading invoices' })).toBeInTheDocument();
  });

  it('supports animation control and native refs', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Spinner animated={false} data-testid="spinner" ref={ref} size="lg" />);

    expect(ref.current).toBe(screen.getByTestId('spinner'));
    expect(ref.current).toHaveAttribute('data-animated', 'false');
  });
});
