import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('preserves native file input attributes and exposes selected files', () => {
    const inputRef = createRef<HTMLInputElement>();
    const onFilesChange = vi.fn();
    render(
      <FileUpload
        accept="image/png"
        description="PNG files only."
        inputRef={inputRef}
        label="Attachments"
        multiple
        name="attachments"
        onFilesChange={onFilesChange}
      />
    );

    const input = screen.getByLabelText('Attachments');
    const file = new File(['image'], 'avatar.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(inputRef.current).toBe(input);
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('accept', 'image/png');
    expect(input).toHaveAttribute('name', 'attachments');
    expect(input).toHaveAccessibleDescription('PNG files only.');
    expect(screen.getByText('avatar.png')).toBeVisible();
    expect(onFilesChange).toHaveBeenCalledWith([file]);
  });

  it('clears the native input and selected-file summary', () => {
    const onFilesChange = vi.fn();
    render(<FileUpload label="Attachments" onFilesChange={onFilesChange} />);
    const input = screen.getByLabelText('Attachments');
    fireEvent.change(input, { target: { files: [new File(['notes'], 'notes.txt')] } });
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(input).toHaveValue('');
    expect(screen.queryByText('notes.txt')).not.toBeInTheDocument();
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
  });
});
