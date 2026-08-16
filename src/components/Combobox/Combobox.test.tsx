import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from './Combobox';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { disabled: true, label: 'Pear', value: 'pear' }
];

describe('Combobox', () => {
  it('wires its label, description, native input ref, and options', () => {
    const inputRef = createRef<HTMLInputElement>();
    render(
      <Combobox
        description="Choose one fruit."
        inputRef={inputRef}
        label="Favorite fruit"
        options={options}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Favorite fruit' });
    expect(inputRef.current).toBe(input);
    expect(input).toHaveAccessibleDescription('Choose one fruit.');
    fireEvent.click(screen.getByRole('button', { name: 'Show options' }));
    expect(screen.getByRole('option', { name: 'Pear' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('selects and clears values through the public callback', () => {
    const onValueChange = vi.fn();
    render(
      <Combobox
        defaultOpen
        label="Favorite fruit"
        onValueChange={onValueChange}
        options={options}
      />
    );

    fireEvent.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onValueChange).toHaveBeenCalledWith('banana', expect.any(Object));
    expect(screen.getByRole('combobox', { name: 'Favorite fruit' })).toHaveValue('Banana');

    fireEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(onValueChange).toHaveBeenLastCalledWith(null, expect.any(Object));
  });
});
