import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from './Dialog';

describe('Dialog', () => {
  it('labels, opens, and closes a modal dialog', () => {
    render(
      <Dialog>
        <DialogTrigger>Edit profile</DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Change your public name.</DialogDescription>
          <DialogClose>Cancel</DialogClose>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Edit profile' }));
    expect(screen.getByRole('dialog', { name: 'Edit profile' })).toHaveAccessibleDescription(
      'Change your public name.'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
