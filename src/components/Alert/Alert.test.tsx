import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from './Alert';

describe('Alert', () => {
  it('renders composed title and description', () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Storage is nearly full.</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Storage is nearly full.')).toBeInTheDocument();
  });

  it('uses alert role for error variant and changes style composition', () => {
    const { rerender } = render(<Alert variant="info">Info</Alert>);
    const alert = screen.getByRole('status');
    const baseClass = alert.className;

    rerender(<Alert variant="error">Error</Alert>);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert').className).not.toEqual(baseClass);
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Saved</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
