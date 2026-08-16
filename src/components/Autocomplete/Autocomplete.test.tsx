import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Autocomplete } from './Autocomplete';

const options = [
  { label: 'Accordion', value: 'accordion' },
  { label: 'Autocomplete', value: 'autocomplete' },
  { disabled: true, label: 'Data grid', value: 'data-grid' }
];

describe('Autocomplete', () => {
  it('wires its label, description, input ref, and suggestions', () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <Autocomplete
        defaultOpen
        description="Enter any component."
        inputRef={inputRef}
        label="Component search"
        options={options}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Component search' });
    expect(inputRef.current).toBe(input);
    expect(input).toHaveAccessibleDescription('Enter any component.');
    expect(screen.getByRole('option', { name: 'Data grid' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('filters suggestions and completes free-form input', () => {
    const onValueChange = vi.fn();
    render(
      <Autocomplete
        defaultOpen
        label="Component search"
        onValueChange={onValueChange}
        options={options}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Component search' });
    fireEvent.change(input, { target: { value: 'auto' } });
    expect(screen.queryByRole('option', { name: 'Accordion' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: 'Autocomplete' }));
    expect(input).toHaveValue('Autocomplete');
    expect(onValueChange).toHaveBeenLastCalledWith('Autocomplete', expect.any(Object));
  });
});
