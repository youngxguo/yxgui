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
    fireEvent.focus(trigger);

    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    fireEvent.change(trigger, { target: { value: 'v' } });

    expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'React' })).not.toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'Enter' });

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(onValueChange).toHaveBeenCalledWith('vue');
    expect(trigger).toHaveValue('Vue');
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
    expect(trigger).toHaveValue('React');

    fireEvent.focus(trigger);
    fireEvent.click(await screen.findByRole('option', { name: 'Clear selection' }));

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(onValueChange).toHaveBeenCalledWith(null);
    expect(trigger).toHaveValue('');
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
    const ref = createRef<HTMLInputElement>();
    render(<Combobox options={options} ref={ref} aria-label="Framework" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('renders a dropdown indicator icon on the trigger', () => {
    render(<Combobox options={options} aria-label="Framework" />);

    const trigger = screen.getByRole('combobox', { name: 'Framework' });
    expect(trigger.parentElement?.querySelector('svg')).toBeInTheDocument();
  });
});
