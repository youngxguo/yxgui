import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TagInput } from './TagInput';

describe('TagInput', () => {
  it('adds unique tags and removes them with the keyboard', () => {
    const onValueChange = vi.fn();
    render(<TagInput defaultValue={['typed']} label="Tags" onValueChange={onValueChange} />);

    const input = screen.getByRole('textbox', { name: 'Tags' });
    fireEvent.change(input, { target: { value: 'accessible' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onValueChange).toHaveBeenLastCalledWith(['typed', 'accessible']);
    expect(screen.getByRole('button', { name: 'Remove accessible' })).toBeVisible();

    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(onValueChange).toHaveBeenLastCalledWith(['typed']);
  });

  it('submits repeated hidden values and ignores duplicates', () => {
    render(<TagInput defaultValue={['react']} label="Tags" name="tags" />);
    const input = screen.getByRole('textbox', { name: 'Tags' });
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyDown(input, { key: ',' });

    expect(document.querySelectorAll('input[name="tags"]')).toHaveLength(1);
    expect(document.querySelector<HTMLInputElement>('input[name="tags"]')).toHaveValue('react');
  });
});
