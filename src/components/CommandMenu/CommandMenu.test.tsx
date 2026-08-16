import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommandMenu, type CommandMenuOption } from './CommandMenu';

const options: CommandMenuOption[] = [
  { id: 'new', label: 'New file', shortcut: 'N' },
  { disabled: true, id: 'delete', label: 'Delete project' },
  { description: 'Change the active color mode', id: 'theme', label: 'Switch theme' }
];

describe('CommandMenu', () => {
  it('filters commands and selects the highlighted result', () => {
    const onSelect = vi.fn();
    render(
      <CommandMenu defaultOpen onSelect={onSelect} options={options} trigger="Open commands" />
    );

    const input = screen.getByRole('combobox', { name: 'Search commands' });
    fireEvent.change(input, { target: { value: 'theme' } });
    expect(screen.getByRole('option', { name: /Switch theme/ })).toBeVisible();
    expect(screen.queryByRole('option', { name: /New file/ })).not.toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith(options[2]);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('skips disabled commands during keyboard navigation', () => {
    const onSelect = vi.fn();
    render(
      <CommandMenu defaultOpen onSelect={onSelect} options={options} trigger="Open commands" />
    );

    const input = screen.getByRole('combobox', { name: 'Search commands' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith(options[2]);
  });
});
