import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

describe('Select', () => {
  it('uses native selection behavior', () => {
    const onChange = vi.fn();
    render(
      <Select aria-label="Workspace" onChange={onChange}>
        <option value="personal">Personal</option>
        <option value="team">Team</option>
      </Select>
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'team' } });
    expect(screen.getByRole('combobox')).toHaveValue('team');
    expect(onChange).toHaveBeenCalledOnce();
  });
});
