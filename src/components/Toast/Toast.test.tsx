import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast } from './Toast';

function Controls({ onUndo }: { onUndo: () => void }) {
  const toast = useToast();
  const id = useRef<string | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          id.current = toast.add({
            action: { label: 'Undo', onClick: onUndo },
            description: 'The project is available across devices.',
            timeout: 0,
            title: 'Project saved',
            variant: 'success'
          });
        }}
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => {
          if (id.current) {
            toast.update(id.current, { title: 'Project synced', variant: 'info' });
          }
        }}
      >
        Update
      </button>
    </>
  );
}

describe('Toast', () => {
  it('adds, updates, acts on, and dismisses notifications', async () => {
    const onUndo = vi.fn();
    render(
      <ToastProvider timeout={0}>
        <Controls onUndo={onUndo} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(await screen.findByText('Project saved')).toBeInTheDocument();
    expect(screen.getByText('The project is available across devices.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onUndo).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(await screen.findByText('Project synced')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    await waitFor(() => expect(screen.queryByText('Project synced')).not.toBeInTheDocument());
  });
});
