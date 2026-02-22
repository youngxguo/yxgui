import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './AlertDialog';

function renderAlertDialog() {
  return render(
    <AlertDialog>
      <AlertDialogTrigger>Delete project</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction destructive>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

describe('AlertDialog', () => {
  it('opens and uses alertdialog labeling', async () => {
    renderAlertDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }));

    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
    expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument();
  });

  it('closes on escape and restores focus', async () => {
    renderAlertDialog();
    const trigger = screen.getByRole('button', { name: 'Delete project' });

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('closes when action is pressed', async () => {
    renderAlertDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Delete project' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Delete' }));
    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
  });
});
