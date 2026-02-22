import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from './Dialog';

function renderDialog() {
  return render(
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Invite teammate</DialogTitle>
        <DialogDescription>Share access with a collaborator.</DialogDescription>
        <input aria-label="Email" />
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe('Dialog', () => {
  it('opens from the trigger and moves focus into content', async () => {
    renderDialog();
    const trigger = screen.getByRole('button', { name: 'Open dialog' });

    fireEvent.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Email' })).toHaveFocus());
  });

  it('closes on escape and restores focus to the trigger', async () => {
    renderDialog();
    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    fireEvent.click(trigger);

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('closes on overlay click and accepts ref props', async () => {
    const contentRef = createRef<HTMLDivElement>();
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent ref={contentRef} data-testid="content">
          Content
        </DialogContent>
      </Dialog>
    );

    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
    fireEvent.mouseDown(screen.getByTestId('content').parentElement as HTMLElement);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
