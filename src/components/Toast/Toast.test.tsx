import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { Toaster, toast } from './Toast';

function ensureMatchMedia() {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'function') {
    return;
  }

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false
    })
  });
}

describe('Toast', () => {
  beforeAll(() => {
    ensureMatchMedia();
  });

  afterEach(() => {
    toast.dismiss();
  });

  it('renders a toaster and announces a success toast', async () => {
    render(<Toaster containerAriaLabel="App notifications" />);

    act(() => {
      toast.success('Profile saved', {
        description: 'Changes were synced.'
      });
    });

    expect(await screen.findByLabelText(/App notifications/i)).toBeInTheDocument();
    expect(await screen.findByText('Profile saved')).toBeInTheDocument();
    expect(await screen.findByText('Changes were synced.')).toBeInTheDocument();

    const successToast = document.querySelector('[data-sonner-toast][data-type="success"]');
    expect(successToast).not.toBeNull();
  });

  it('supports action and cancel variants through the exported helper', async () => {
    const onUndo = vi.fn();
    render(<Toaster />);

    act(() => {
      toast('Item archived', {
        action: { label: 'Undo', onClick: onUndo },
        cancel: { label: 'Dismiss', onClick: () => undefined }
      });
    });

    expect(await screen.findByText('Item archived')).toBeInTheDocument();
    const undoButton = await screen.findByRole('button', { name: 'Undo' });
    expect(undoButton).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Dismiss' })).toBeInTheDocument();

    fireEvent.click(undoButton);
    await waitFor(() => expect(onUndo).toHaveBeenCalledTimes(1));
  });
});
