import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from './Alert';

describe('Alert', () => {
  it('composes status content and forwards refs', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Alert ref={ref}>
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>Your changes are live.</AlertDescription>
      </Alert>
    );

    expect(ref.current).toBe(screen.getByRole('status'));
    expect(ref.current).toHaveTextContent('Saved');
    expect(ref.current).toHaveTextContent('Your changes are live.');
  });

  it('uses an alert role for danger messages', () => {
    render(<Alert variant="danger">Could not save</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Could not save');
  });
});
