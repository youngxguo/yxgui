import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MultiSelect } from './MultiSelect';

const options = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'StyleX', value: 'stylex' }
];

describe('MultiSelect', () => {
  it('renders removable chips for selected values', () => {
    const onValueChange = vi.fn();
    render(
      <MultiSelect
        defaultValue={['react', 'typescript']}
        label="Technologies"
        onValueChange={onValueChange}
        options={options}
      />
    );

    expect(screen.getByRole('button', { name: 'Remove React' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Remove React' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['typescript'], expect.any(Object));
  });

  it('filters and adds values without closing the selection model', () => {
    const onValueChange = vi.fn();
    render(
      <MultiSelect
        defaultOpen
        label="Technologies"
        onValueChange={onValueChange}
        options={options}
      />
    );

    const input = screen.getByRole('combobox', { name: 'Technologies' });
    fireEvent.change(input, { target: { value: 'style' } });
    fireEvent.click(screen.getByRole('option', { name: 'StyleX' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['stylex'], expect.any(Object));
    expect(screen.getByRole('button', { name: 'Remove StyleX' })).toBeVisible();
  });
});
