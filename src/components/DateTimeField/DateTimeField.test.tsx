import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { DateField, DateTimeField, TimeField } from './DateTimeField';

describe('native date and time fields', () => {
  it('connects a date label, description, constraints, and ref', () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <DateField
        defaultValue="2026-08-16"
        description="Use your local date."
        inputRef={inputRef}
        label="Start date"
        max="2026-12-31"
        min="2026-01-01"
      />
    );

    const input = screen.getByLabelText('Start date');
    expect(inputRef.current).toBe(input);
    expect(input).toHaveAttribute('type', 'date');
    expect(input).toHaveAttribute('min', '2026-01-01');
    expect(input).toHaveAttribute('max', '2026-12-31');
    expect(input).toHaveAccessibleDescription('Use your local date.');
  });

  it('preserves native time precision and validation state', () => {
    render(
      <TimeField error="Choose a supported time." label="Start time" step={60} value="09:30" />
    );

    const input = screen.getByLabelText('Start time');
    expect(input).toHaveAttribute('type', 'time');
    expect(input).toHaveAttribute('step', '60');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Choose a supported time.');
  });

  it('uses the native local date-time value contract', () => {
    render(<DateTimeField defaultValue="2026-08-16T09:30" label="Publish at" name="publishAt" />);
    const input = screen.getByLabelText('Publish at');
    expect(input).toHaveAttribute('type', 'datetime-local');
    expect(input).toHaveAttribute('name', 'publishAt');
    expect(input).toHaveValue('2026-08-16T09:30');
  });
});
