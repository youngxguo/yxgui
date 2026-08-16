import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Rating } from './Rating';

describe('Rating', () => {
  it('uses a native named radio group and reports value changes', () => {
    const onValueChange = vi.fn();
    render(
      <Rating defaultValue={2} label="Product rating" name="rating" onValueChange={onValueChange} />
    );

    expect(screen.getByRole('group', { name: 'Product rating' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '2 stars' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '2 stars' })).toHaveAttribute('name', 'rating');
    fireEvent.click(screen.getByRole('radio', { name: '4 stars' }));
    expect(screen.getByRole('radio', { name: '4 stars' })).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it('does not mutate a controlled value', () => {
    const onValueChange = vi.fn();
    render(<Rating label="Rating" onValueChange={onValueChange} value={3} />);
    fireEvent.click(screen.getByRole('radio', { name: '5 stars' }));
    expect(onValueChange).toHaveBeenCalledWith(5);
    expect(screen.getByRole('radio', { name: '3 stars' })).toBeChecked();
  });
});
