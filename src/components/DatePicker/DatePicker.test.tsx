import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('submits a named ISO value and closes after selection', () => {
    const inputRef = createRef<HTMLInputElement>();
    const onValueChange = vi.fn();
    const { container } = render(
      <DatePicker
        defaultOpen
        defaultValue="2026-08-16"
        inputRef={inputRef}
        label="Release date"
        name="releaseDate"
        onValueChange={onValueChange}
      />
    );

    expect(screen.getByRole('dialog', { name: 'Release date calendar' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Monday, August 17, 2026' }));
    expect(screen.queryByRole('dialog', { name: 'Release date calendar' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Release date Aug 17, 2026/ })).toBeInTheDocument();
    expect(container.querySelector('input[name="releaseDate"]')).toHaveValue('2026-08-17');
    expect(inputRef.current).toHaveValue('2026-08-17');
    expect(onValueChange).toHaveBeenCalledWith('2026-08-17');
  });

  it('does not mutate a controlled value', () => {
    const onValueChange = vi.fn();
    render(
      <DatePicker
        defaultOpen
        label="Release date"
        onValueChange={onValueChange}
        value="2026-08-16"
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Monday, August 17, 2026' }));
    expect(onValueChange).toHaveBeenCalledWith('2026-08-17');
    expect(screen.getByRole('button', { name: /Release date Aug 16, 2026/ })).toBeInTheDocument();
  });

  it('connects validation feedback to the trigger', () => {
    render(<DatePicker error="Choose a release date." label="Release date" />);
    const trigger = screen.getByRole('button', { name: /Release date Choose a date/ });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAccessibleDescription('Choose a release date.');
  });
});
