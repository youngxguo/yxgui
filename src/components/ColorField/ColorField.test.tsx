import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ColorField } from './ColorField';

describe('ColorField', () => {
  it('normalizes valid text and keeps the native picker synchronized', () => {
    const onValueChange = vi.fn();
    render(<ColorField label="Brand color" onValueChange={onValueChange} />);
    const text = screen.getByRole('textbox', { name: 'Brand color' });
    const picker = screen.getByLabelText('Choose color');

    fireEvent.change(text, { target: { value: '#abc' } });
    fireEvent.blur(text);
    expect(onValueChange).toHaveBeenLastCalledWith('#aabbcc');
    expect(picker).toHaveValue('#aabbcc');
    fireEvent.change(picker, { target: { value: '#ff0000' } });
    expect(text).toHaveValue('#ff0000');
  });

  it('reverts incomplete text on blur', () => {
    render(<ColorField defaultValue="#123456" label="Color" />);
    const text = screen.getByRole('textbox', { name: 'Color' });
    fireEvent.change(text, { target: { value: '#12' } });
    expect(text).toHaveValue('#12');
    fireEvent.blur(text);
    expect(text).toHaveValue('#123456');
  });

  it('restores its default value with the owning form', () => {
    render(
      <form>
        <ColorField defaultValue="#123456" label="Color" />
        <button type="reset">Reset</button>
      </form>
    );
    const text = screen.getByRole('textbox', { name: 'Color' });
    fireEvent.change(text, { target: { value: '#ffffff' } });
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(text).toHaveValue('#123456');
  });
});
