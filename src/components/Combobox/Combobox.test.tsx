import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from './Combobox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'solid', label: 'Solid', disabled: true }
];

describe('Combobox', () => {
  it('filters options and supports keyboard selection', async () => {
    const onValueChange = vi.fn();
    render(<Combobox options={options} onValueChange={onValueChange} aria-label="Framework" />);

    const trigger = screen.getByRole('combobox', { name: 'Framework' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    const searchInput = screen.getByRole('textbox', { name: 'Search options' });
    fireEvent.change(searchInput, { target: { value: 'v' } });

    expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument();

    fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(onValueChange).toHaveBeenCalledWith('vue');
    expect(trigger).toHaveTextContent('Vue');
  });

  it('renders current value and allows clearing selection', async () => {
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={options}
        defaultValue="react"
        onValueChange={onValueChange}
        aria-label="Framework"
      />
    );

    const trigger = screen.getByRole('combobox', { name: 'Framework' });
    expect(trigger).toHaveTextContent('React');

    fireEvent.click(trigger);
    fireEvent.click(await screen.findByRole('option', { name: 'Clear selection' }));

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(onValueChange).toHaveBeenCalledWith(null);
    expect(trigger).toHaveTextContent('Select an option');
  });

  it('respects disabled state and data attributes', () => {
    render(<Combobox options={options} aria-label="Framework" disabled invalid />);

    const trigger = screen.getByRole('combobox', { name: 'Framework' });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('data-disabled', '');
    expect(trigger).toHaveAttribute('data-invalid', '');

    fireEvent.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('accepts a ref prop', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Combobox options={options} ref={ref} aria-label="Framework" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
