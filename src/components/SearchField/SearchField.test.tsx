import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SearchField } from './SearchField';

describe('SearchField', () => {
  it('reports native input changes and clears back to focused search', () => {
    const inputRef = createRef<HTMLInputElement>();
    const onValueChange = vi.fn();
    render(<SearchField inputRef={inputRef} label="Search docs" onValueChange={onValueChange} />);
    const input = screen.getByRole('searchbox', { name: 'Search docs' });
    fireEvent.change(input, { target: { value: 'dialog' } });
    expect(onValueChange).toHaveBeenLastCalledWith('dialog');
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(inputRef.current).toBe(input);
  });

  it('connects description and error state', () => {
    render(
      <SearchField
        description="Search component names."
        error="Search is unavailable."
        label="Search docs"
      />
    );
    const input = screen.getByRole('searchbox', { name: 'Search docs' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Search component names. Search is unavailable.');
  });
});
