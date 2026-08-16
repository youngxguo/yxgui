import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SegmentedControl } from './SegmentedControl';

const options = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { disabled: true, label: 'Timeline', value: 'timeline' }
] as const;

describe('SegmentedControl', () => {
  it('uses a native named radio group and reports value changes', () => {
    const onValueChange = vi.fn();
    render(
      <SegmentedControl
        defaultValue="list"
        description="Choose how projects are displayed."
        label="View"
        name="view"
        onValueChange={onValueChange}
        options={options}
      />
    );

    const group = screen.getByRole('group', { name: 'View' });
    const list = screen.getByRole('radio', { name: 'List' });
    const board = screen.getByRole('radio', { name: 'Board' });
    expect(group).toHaveAccessibleDescription('Choose how projects are displayed.');
    expect(list).toBeChecked();
    expect(list).toHaveAttribute('name', 'view');
    expect(screen.getByRole('radio', { name: 'Timeline' })).toBeDisabled();

    fireEvent.click(board);
    expect(board).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith('board');
  });

  it('does not mutate a controlled value', () => {
    const onValueChange = vi.fn();
    render(
      <SegmentedControl label="View" onValueChange={onValueChange} options={options} value="list" />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Board' }));
    expect(onValueChange).toHaveBeenCalledWith('board');
    expect(screen.getByRole('radio', { name: 'List' })).toBeChecked();
  });

  it('connects validation feedback to the group', () => {
    render(<SegmentedControl error="Choose a view." label="View" options={options} />);
    const group = screen.getByRole('group', { name: 'View' });
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAccessibleDescription('Choose a view.');
  });
});
