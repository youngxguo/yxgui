import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders an accessible date grid and reports selections', () => {
    const ref = createRef<HTMLDivElement>();
    const onValueChange = vi.fn();
    render(
      <Calendar
        defaultValue="2026-08-16"
        label="Release date"
        onValueChange={onValueChange}
        ref={ref}
      />
    );

    expect(ref.current).toBe(screen.getByRole('group', { name: 'Release date' }));
    expect(screen.getByRole('grid', { name: 'August 2026' })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: 'Sunday, August 16, 2026' })).toHaveAttribute(
      'aria-selected',
      'true'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Thursday, August 20, 2026' }));
    expect(screen.getByRole('gridcell', { name: 'Thursday, August 20, 2026' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(onValueChange).toHaveBeenCalledWith('2026-08-20');
  });

  it('navigates months and respects date limits', () => {
    render(
      <Calendar defaultValue="2026-08-16" label="Release date" max="2026-09-10" min="2026-08-10" />
    );
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Sunday, August 9, 2026' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('grid', { name: 'September 2026' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Friday, September 11, 2026' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next month' })).toBeDisabled();
  });

  it('does not mutate a controlled value', () => {
    const onValueChange = vi.fn();
    render(<Calendar label="Release date" onValueChange={onValueChange} value="2026-08-16" />);
    fireEvent.click(screen.getByRole('button', { name: 'Thursday, August 20, 2026' }));
    expect(onValueChange).toHaveBeenCalledWith('2026-08-20');
    expect(screen.getByRole('gridcell', { name: 'Sunday, August 16, 2026' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });
});
