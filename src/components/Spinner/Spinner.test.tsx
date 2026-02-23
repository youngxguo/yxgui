import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders as decorative by default and becomes a status when labeled', () => {
    const { rerender } = render(<Spinner data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');

    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(spinner).not.toHaveAttribute('role');

    rerender(<Spinner label="Loading invoices" />);
    expect(screen.getByRole('status', { name: 'Loading invoices' })).toBeInTheDocument();
  });

  it('supports size variants and disabling animation', () => {
    const { rerender } = render(<Spinner data-testid="spinner" size="sm" />);
    const spinner = screen.getByTestId('spinner');
    const smallClass = spinner.className;

    rerender(<Spinner data-testid="spinner" size="lg" animated={false} />);

    expect(spinner.className).not.toEqual(smallClass);
    expect(spinner).toHaveAttribute('data-animated', 'false');
    expect(spinner.querySelector('animateTransform')).toBeNull();
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
