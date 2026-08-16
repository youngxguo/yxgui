import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CopyButton } from './CopyButton';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('CopyButton', () => {
  it('copies the value and reports temporary success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const onCopy = vi.fn();
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    render(<CopyButton onCopy={onCopy} value="pnpm add yxgui" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Copied' })).toBeVisible());
    expect(writeText).toHaveBeenCalledWith('pnpm add yxgui');
    expect(onCopy).toHaveBeenCalledWith('pnpm add yxgui');
  });

  it('reports clipboard failures', async () => {
    const error = new Error('Permission denied');
    const onCopyError = vi.fn();
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(error) } });

    render(<CopyButton onCopyError={onCopyError} value="secret" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Copy failed' })).toBeVisible());
    expect(onCopyError).toHaveBeenCalledWith(error);
  });
});
