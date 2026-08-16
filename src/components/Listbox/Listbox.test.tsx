import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Listbox, ListboxOption } from './Listbox';

describe('Listbox', () => {
  it('preserves native listbox semantics and selection behavior', () => {
    const ref = createRef<HTMLSelectElement>();
    const onChange = vi.fn();
    render(
      <Listbox
        defaultValue="alert"
        description="Choose the component to open."
        label="Components"
        name="component"
        onChange={onChange}
        ref={ref}
      >
        <ListboxOption value="accordion">Accordion</ListboxOption>
        <ListboxOption value="alert">Alert</ListboxOption>
        <ListboxOption value="button">Button</ListboxOption>
      </Listbox>
    );

    const listbox = screen.getByRole('listbox', { name: 'Components' });
    expect(ref.current).toBe(listbox);
    expect(listbox).toHaveAttribute('name', 'component');
    expect(listbox).toHaveAttribute('size', '5');
    expect(listbox).toHaveAccessibleDescription('Choose the component to open.');
    expect(listbox).toHaveValue('alert');

    fireEvent.change(listbox, { target: { value: 'button' } });
    expect(listbox).toHaveValue('button');
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('connects validation feedback and supports native multiple selection', () => {
    render(
      <Listbox error="Choose at least one component." label="Pinned components" multiple>
        <ListboxOption value="accordion">Accordion</ListboxOption>
        <ListboxOption value="alert">Alert</ListboxOption>
      </Listbox>
    );

    const listbox = screen.getByRole('listbox', { name: 'Pinned components' });
    expect(listbox).toHaveAttribute('multiple');
    expect(listbox).toHaveAttribute('aria-invalid', 'true');
    expect(listbox).toHaveAccessibleDescription('Choose at least one component.');
  });
});
